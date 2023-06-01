import './node.css'

import clsx from 'clsx'
import { useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import uniqid from 'uniqid'

import { CanvasState } from '~/entities/decision'
import { PointState } from '~/entities/point/state'
import { RuleSet } from '~/entities/point/widgets/node/ui/rule-set'
import Button from '~/ui/button'
import { Any, Id, Offset } from '~/utils/core'
import { getOffsetInElement, observeResize } from '~/utils/dom'
import { keyListener } from '~/utils/dom/key-listener'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import Link from '../../link'

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
              <Link
                key={rule.id}
                sourceOffset={getSourceOffset(rule.id)}
                targetOffset={{ top: targetState.height.value / 2, left: 0 }}
                decisionState={props.decisionState}
                sourceState={props.state}
                targetState={targetState}
                onClick={(): void => props.state?.ruleList.removeLink(rule.id)}
              />,
              props.linksContainer
            )
          }
          return (
            <RuleSet
              key={rule.id}
              id={rule.id}
              isLinked={Boolean(rule.pointId)}
              onAddLink={(): void => {
                props.decisionState.editingLink.add({
                  rule,
                  sourceState: props.state,
                  sourceRuleId: rule.id,
                })
              }}
            >
              {rule.name}
              {renderedLink}
            </RuleSet>
          )
        })}
      </div>
      <div className='add-rule'>
        <Button
          height='s'
          onClick={(): void =>
            props.state.ruleList.add({
              id: uniqid(),
              name: `name_${uniqid()}`,
              type: 'test',
            })
          }
        >
          add rule
        </Button>
      </div>
    </div>
  )

  // Private

  function getSourceOffset(id: Id): Offset {
    const srcLinkEl = props.state?.ref.value?.querySelector(`[data-id="${id.toString()}"]`) as HTMLElement
    const srcLinkOffset = getOffsetInElement(srcLinkEl, props.state?.ref.value)
    const srcLinkRect = srcLinkEl?.getBoundingClientRect() || { height: 0 }

    return {
      left: props.state.width.value,
      top: (srcLinkOffset.top + srcLinkRect.height / 2) / props.decisionState.scale.value,
    }
  }

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
