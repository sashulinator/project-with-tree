import { useEffect } from 'react'

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
  })

  return <path stroke='black' d={drawPath()} />

  // Private

  function drawPath(): string {
    const sx = props.sourceState.position.x + props.sourceState.width / 2 - 20
    const sy = props.sourceState.position.y + props.sourceState.height / 2
    const tx = props.targetState.position.x
    const ty = props.targetState.position.y
    return `M${sx},${sy}L${tx},${ty}`
  }
}
