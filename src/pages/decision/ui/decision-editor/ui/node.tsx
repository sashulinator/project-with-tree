import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import { useEffect, useRef } from 'react'

import { Node } from '~/entities/decision'
import { State as TreeState } from '~/packages/chart'
import { EventNames, State as NodeState, Position } from '~/packages/tree-chart-node'
import { assertNotNull } from '~/utils/core'
import { useForceUpdate } from '~/utils/hooks'

export interface NodeProps {
  node: Node
  state: NodeState
  treeState: TreeState
}

export default function NodeUI(props: NodeProps): JSX.Element {
  const xyRef = useRef<Position | null>(null)
  const update = useForceUpdate()

  const dragBind = useDrag((event): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    event.event.stopPropagation()
    if (xyRef.current === null) {
      xyRef.current = props.state.position
    }
    assertNotNull(xyRef.current)
    const mx = (event.movement[0] * 1) / props.treeState.scale
    const my = (event.movement[1] * 1) / props.treeState.scale
    const x = xyRef.current.x + mx
    const y = xyRef.current.y + my
    props.state.setPosition({ x, y })
    if (event.last) {
      xyRef.current = null
    }
  })

  useEffect(() => {
    props.state.mitt.on(EventNames.setPosition, update)
  })

  return (
    <g style={{ transform: getTransform() }} {...dragBind()}>
      <rect width='100' height='100' fill='red' />
      <text>{props.node.name}</text>
    </g>
  )

  // Private

  function getTransform(): string {
    return `translate(${props.state.position.x}px, ${props.state.position.y}px)`
  }
}
