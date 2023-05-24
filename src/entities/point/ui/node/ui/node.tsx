import './node.css'

import clsx from 'clsx'
import { useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import useMeasure from 'react-use-measure'
import uniqid from 'uniqid'

import { CanvasState } from '~/entities/decision'
import { observeResize } from '~/utils/dom'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'
import { PointState } from '~/widgets/chart-item'
import ChartLink from '~/widgets/chart-link'

export interface NodeProps {
  state: PointState
  isSelected: boolean
  linksContainer: SVGGElement
  decisionState: CanvasState
}

const WIDTH = 200

export default function Node(props: NodeProps): JSX.Element {
  const { point: data } = props.state
  const [setRef, { height }] = useMeasure()

  useLayoutEffect(observeSize, [])
  useUpdate(updateOnEvents)

  return (
    <>
      {createPortal(
        <>
          {props.state.ruleList.value.map((rule) => {
            if (!rule.pointId) return null
            const state = props.decisionState.pointStates.get(rule.pointId)
            return <ChartLink key={rule.pointId} rule={rule} sourceState={props.state} targetState={state} />
          })}
        </>,
        props.linksContainer
      )}
      <foreignObject width={WIDTH} height={height} style={{ overflow: 'visible' }}>
        <div
          data-id={data.id}
          className={clsx('PointNode', props.isSelected && '--selected')}
          style={{ width: WIDTH }}
          // eslint-disable-next-line @typescript-eslint/unbound-method
          ref={setRefs(props.state.setRef, setRef)}
        >
          <div className='name'>{props.state.point.name}</div>
          <div className='links'>
            {props.state.ruleList.value?.map((rule) => {
              return (
                <div key={rule.id} data-id={rule.pointId}>
                  {rule.name}
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
      </foreignObject>
    </>
  )

  // Private

  function updateOnEvents(update: () => void): void {
    props.state.emitter.on('setRuleList', update)
  }

  function observeSize(): (() => void) | void {
    if (!props.state.ref.current) return
    const unsubscribe = observeResize(props.state.ref.current, (entry) => {
      const rect = entry.target.getBoundingClientRect()
      props.state.setWidth(Math.round(rect.width))
      props.state.setHeight(Math.round(rect.height))
    })
    return () => unsubscribe?.()
  }
}
