import './chart-link.css'

import { useEffect, useLayoutEffect, useState } from 'react'

import { CanvasState } from '~/entities/decision'
import { Rule } from '~/entities/rule'
import { assertNotNil } from '~/utils/core'
import { getOffsetInElement } from '~/utils/dom/get-offset-in-element'
import { useForceUpdate } from '~/utils/hooks'
import { PointState, Position } from '~/widgets/chart-item'

export interface ChartLinkProps {
  decisionState: CanvasState
  targetState?: PointState | undefined
  sourceState?: PointState | undefined
  rule: Rule
}

export default function ChartLink(props: ChartLinkProps): JSX.Element {
  const update = useForceUpdate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    props.targetState?.emitter.on('setPosition', update)
    props.sourceState?.emitter.on('setPosition', update)
    props.targetState?.emitter.on('setHeight', update)
    props.sourceState?.emitter.on('setHeight', update)
    props.targetState?.emitter.on('setWidth', update)
    props.sourceState?.emitter.on('setWidth', update)
    props.sourceState?.emitter.on('setRef', update)

    function updateMousePosition(ev: MouseEvent): void {
      const el = props.targetState ? props.targetState.ref.current : props.sourceState?.ref.current
      assertNotNil(el)
      const rect = el.getBoundingClientRect()

      setMousePosition({
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top,
      })
    }

    if (!props.sourceState || !props.targetState) {
      document.addEventListener('mousemove', updateMousePosition)
      document.addEventListener('mouseenter', updateMousePosition)
    }
    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', updateMousePosition)
    }
  })

  useLayoutEffect(update, [])

  return (
    <path
      className='CanvasLink'
      d={drawPath()}
      strokeWidth={2}
      onClick={(): void => props.sourceState?.ruleList.removeLink(props.rule.id)}
    />
  )

  // Private

  function drawPath(): string {
    const s = sourcePosition(props.sourceState)
    const t = targetPosition(props.targetState)

    return `M${s.x},${s.y}L${t.x},${t.y}`
  }

  function sourcePosition(state: PointState | undefined): Position {
    if (!state) {
      const rect = (props.decisionState.paintingPanelRef.current as SVGGElement).getBoundingClientRect()
      return {
        x: mousePosition.x + rect.x,
        y: mousePosition.y + rect.y,
      }
    }

    const srcLinkEl = props.sourceState?.ref.current?.querySelector(
      `[data-id="${props.rule.pointId as string}"]`
    ) as HTMLElement
    const srcLinkOffset = getOffsetInElement(srcLinkEl, props.sourceState?.ref.current)
    return {
      x: state.position.value.x + state.width / 2,
      y: state.position.value.y - state.height / 2 + srcLinkOffset.top,
    }
  }

  function targetPosition(state: PointState | undefined): Position {
    if (!state) {
      const rect = (props.decisionState.paintingPanelRef.current as SVGGElement).getBoundingClientRect()
      // console.log('rect', rect, mousePosition.x, props.decisionState.translate.x)

      return {
        x: rect.x + mousePosition.x - props.decisionState.translate.x,
        y: rect.y + mousePosition.y - props.decisionState.translate.y,
      }
    }

    return {
      x: state.position.value.x - state.width / 2,
      y: state.position.value.y,
    }
  }
}
