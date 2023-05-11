import { useEffect, useLayoutEffect } from 'react'

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
    props.sourceState.mitt.on(EventNames.setRef, update)
  })

  useLayoutEffect(update, [])

  return <path stroke='black' d={drawPath()} strokeWidth={2} />

  // Private

  function drawPath(): string {
    const sx = props.sourceState.position.x + props.sourceState.width / 2
    const sy = props.sourceState.position.y - props.sourceState.height / 2 + getOffset()
    const tx = props.targetState.position.x - props.targetState.width / 2
    const ty = props.targetState.position.y

    return `M${sx},${sy}L${tx},${ty}`
  }

  function getOffset(): number {
    if (props.sourceState.ref.current === null) return 0
    const linkOutEl = props.sourceState.ref.current.querySelector(`[data-id="${props.link.id}"]`) as HTMLElement
    const parentOffset = linkOutEl?.parentElement?.offsetTop || 0
    const offsetTop = linkOutEl.offsetTop - parentOffset
    console.log(offsetTop)
    return offsetTop
  }
}
