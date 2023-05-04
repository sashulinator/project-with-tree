import { useEffect } from 'react'

import { getLinkOutProps } from '~/entities/decision/ui/node/lib/get-link-out-position'
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

  return <path stroke='black' d={drawPath()} strokeWidth={2} />

  // Private

  function drawPath(): string {
    let sx = props.sourceState.position.x + props.sourceState.width / 2 - 20
    const sy = props.sourceState.position.y + props.sourceState.height / 2
    const tx = props.targetState.position.x
    const ty = props.targetState.position.y

    if (props.link.type === 'true') {
      const pos = getLinkOutProps({ width: props.sourceState.position.x + props.sourceState.width / 2, height: 0 }, 0)
      sx = pos.cx
    }
    if (props.link.type === 'false') {
      const pos = getLinkOutProps({ width: props.sourceState.position.x + props.sourceState.width / 2, height: 0 }, 1)
      sx = pos.cx
    }

    return `M${sx},${sy}L${tx},${ty}`
  }
}
