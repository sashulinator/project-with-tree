import { useEffect, useLayoutEffect } from 'react'

import { getOffsetInElement } from '~/utils/dom/get-offset-in-element'
import { useForceUpdate } from '~/utils/hooks'
import { EventNames, State } from '~/widgets/chart-item'

export interface ChartLinkProps<T> {
  targetState: State<T>
  sourceState: State<T>
  link: { type: string; id: string }
}

export default function ChartLink<T>(props: ChartLinkProps<T>): JSX.Element {
  const update = useForceUpdate()

  useEffect(() => {
    props.targetState.mitt.on(EventNames.setPosition, update)
    props.sourceState.mitt.on(EventNames.setPosition, update)
    props.targetState.mitt.on(EventNames.setHeight, update)
    props.sourceState.mitt.on(EventNames.setHeight, update)
    props.targetState.mitt.on(EventNames.setWidth, update)
    props.sourceState.mitt.on(EventNames.setWidth, update)
    props.sourceState.mitt.on(EventNames.setRef, update)
  })

  useLayoutEffect(update, [])

  return <path stroke='black' d={drawPath()} strokeWidth={2} />

  // Private

  function drawPath(): string {
    const srcLinkEl = props.sourceState.ref.current?.querySelector(`[data-id="${props.link.id}"]`) as HTMLElement
    const srcLinkOffset = getOffsetInElement(srcLinkEl, props.sourceState.ref.current)
    const sx = props.sourceState.position.x + props.sourceState.width / 2
    const sy = props.sourceState.position.y - props.sourceState.height / 2 + srcLinkOffset.top
    const tx = props.targetState.position.x - props.targetState.width / 2
    const ty = props.targetState.position.y
    return `M${sx},${sy}L${tx},${ty}`
  }
}
