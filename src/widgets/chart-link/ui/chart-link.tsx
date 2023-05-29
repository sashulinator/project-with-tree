import './chart-link.css'

import { useEffect, useLayoutEffect, useState } from 'react'

import { CanvasState } from '~/entities/decision'
import { PointState } from '~/entities/point/state'
import { Rule } from '~/entities/rule'
import { assertDefined } from '~/utils/core'
import { getOffsetInElement } from '~/utils/dom/get-offset-in-element'
import { emptyFn } from '~/utils/function/empty-fn'
import { useForceUpdate } from '~/utils/hooks'
import { Position } from '~/widgets/canvas/ui/item'

export interface ChartLinkProps {
  decisionState: CanvasState
  targetState?: PointState | undefined
  sourceState?: PointState | undefined
  rule?: Rule
}

export default function ChartLink(props: ChartLinkProps): JSX.Element | null {
  const update = useForceUpdate()
  const [mousePosition, setMousePosition] = useState<null | Position>(null)

  useEffect(() => {
    props.targetState?.emitter.on('setPosition', update)
    props.sourceState?.emitter.on('setPosition', update)
    props.targetState?.emitter.on('setHeight', update)
    props.sourceState?.emitter.on('setHeight', update)
    props.targetState?.emitter.on('setWidth', update)
    props.sourceState?.emitter.on('setWidth', update)
    props.sourceState?.emitter.on('setRef', update)

    function updateMousePosition(ev: MouseEvent): void {
      setMousePosition({
        x: Math.round(ev.clientX),
        y: Math.round(ev.clientY),
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

  const path = drawPath()

  if (!path) return null

  return (
    <path
      className='CanvasLink'
      d={path}
      strokeWidth={2}
      onClick={
        props.sourceState && props.targetState && props.rule
          ? (): void => props.sourceState?.ruleList.removeLink((props.rule as Rule).id)
          : emptyFn
      }
    />
  )

  // Private

  function drawPath(): string | null {
    const s = sourcePosition(props.sourceState)
    const t = targetPosition(props.targetState)

    if (s === null || t === null) return null

    return `M${s.x},${s.y}L${t.x},${t.y}`
  }

  function sourcePosition(state: PointState | undefined): Position | null {
    if (!state) {
      if (mousePosition === null) return null
      const rect = (props.decisionState.paintingPanelRef.current as SVGGElement).getBoundingClientRect()
      return {
        x: mousePosition.x + rect.x,
        y: mousePosition.y + rect.y,
      }
    }

    assertDefined(props.rule)
    const srcLinkEl = props.sourceState?.ref.value?.querySelector(
      `[data-id="${props.rule.id as string}"]`
    ) as HTMLElement
    const srcLinkOffset = getOffsetInElement(srcLinkEl, props.sourceState?.ref.value)
    const srcLinkRect = srcLinkEl?.getBoundingClientRect() || { height: 0 }
    return {
      x: state.position.value.x + state.width.value,
      y: state.position.value.y + srcLinkOffset.top + srcLinkRect.height / 2,
    }
  }

  function targetPosition(state: PointState | undefined): Position | null {
    if (!state) {
      if (mousePosition === null) return null
      return {
        x: mousePosition.x - props.decisionState.translate.x / props.decisionState.scale,
        y: mousePosition.y - props.decisionState.translate.y / props.decisionState.scale,
      }
    }

    return {
      x: state.position.value.x,
      y: state.position.value.y + state.height.value / 2,
    }
  }
}
