import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import { Node } from '~/entities/decision'
// import { State } from '~/packages/tree-chart-node'
import { Id } from '~/utils/core'

export interface NodeProps {
  node: Node
  // state: State
}

export default function NodeUI(props: NodeProps): JSX.Element {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  const dragBind = useDrag((event): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    event.event.stopPropagation()

    const x = event.lastOffset[0] + event.movement[0]
    const y = event.lastOffset[1] + event.movement[1]
    api.set({ x, y })
  })

  return (
    <animated.g style={{ x, y }} {...dragBind()}>
      <rect width='100' height='100' fill='red' />
      <text>{props.node.name}</text>
    </animated.g>
  )
}
