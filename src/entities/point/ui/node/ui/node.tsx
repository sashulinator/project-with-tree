import './node.css'

import clsx from 'clsx'
import { useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import uniqid from 'uniqid'

import { CanvasState } from '~/entities/decision'
import { PointState } from '~/entities/point/state'
import { Any } from '~/utils/core'
import { observeResize } from '~/utils/dom'
import { keyListener } from '~/utils/dom/key-listener'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'
import ChartLink from '~/widgets/chart-link'

export interface NodeProps {
  state: PointState
  isSelected: boolean
  linksContainer: SVGGElement
  decisionState: CanvasState
}

const WIDTH = 200

export default function Node(props: NodeProps): JSX.Element {
  const { point } = props.state

  useLayoutEffect(observeSize, [])
  useUpdate(updateOnEvents)

  return (
    <div
      tabIndex={0}
      role='button'
      onKeyDown={keyListener('Enter', finishLinkEditing)}
      onClick={finishLinkEditing}
      data-id={point.id}
      className={clsx('PointNode', props.isSelected && '--selected')}
      style={{ width: WIDTH }}
      ref={setRefs(props.state.ref.set)}
    >
      <div className='name'>{props.state.point.name}</div>
      <div className='links'>
        {props.state.ruleList.value?.map((rule) => {
          let renderedLink: Any = null
          if (rule.pointId) {
            const targetState = props.decisionState.pointStates.get(rule.pointId)
            renderedLink = createPortal(
              <ChartLink
                key={rule.id}
                decisionState={props.decisionState}
                rule={rule}
                sourceState={props.state}
                targetState={targetState}
              />,
              props.linksContainer
            )
          }
          return (
            <div key={rule.id} data-id={rule.id}>
              {rule.name}
              {!rule.pointId && (
                <button
                  onClick={(e): void => {
                    e.stopPropagation()
                    props.decisionState.editingLink.add({
                      rule,
                      sourceState: props.state,
                    })
                  }}
                >
                  +
                </button>
              )}
              {renderedLink}
            </div>
          )
        })}
      </div>
      <div className='add-rule'>
        <button
          onClick={(): void =>
            props.state.ruleList.add({
              id: uniqid(),
              name: `name_${uniqid()}`,
              type: 'test',
            })
          }
        >
          add rule
        </button>
      </div>
    </div>
  )

  // Private

  function finishLinkEditing(): void {
    if (!props.decisionState.editingLink.value) return
    props.decisionState.editingLink.finish(point.id)
  }

  function updateOnEvents(update: () => void): void {
    props.state.emitter.on('setRuleList', update)
  }

  function observeSize(): (() => void) | void {
    if (!props.state.ref.value) return
    const unsubscribe = observeResize(props.state.ref.value, (entry) => {
      const rect = entry.target.getBoundingClientRect()
      props.state.width.value = Math.round(rect.width)
      props.state.height.value = Math.round(rect.height)
    })
    return () => unsubscribe?.()
  }
}
