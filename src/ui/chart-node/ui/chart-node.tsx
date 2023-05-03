import { useDrag } from '@use-gesture/react'

import { useEffect, useRef } from 'react'

import { Item } from '~/entities/decision'
import { State as TreeState } from '~/packages/chart'
import { EventNames, State as ItemState, Position } from '~/packages/tree-chart-item'
import { Any, assertNotNull } from '~/utils/core'
import { useForceUpdate } from '~/utils/hooks'

export interface ChartNodeProps {
  onClick: (event: MouseEvent) => void
  children: React.ReactNode
  state: ItemState<Item>
  treeState: TreeState<Any, Any>
}

export default function ChartNode(props: ChartNodeProps): JSX.Element {
  const xyRef = useRef<Position | null>(null)
  const update = useForceUpdate()

  const dragBind = useDrag((event): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    event.event.stopPropagation()
    if (xyRef.current === null) {
      xyRef.current = props.state.position
    }
    const idle = event.movement[0] === 0 && event.movement[1] === 0
    if (event.last && idle && event.event.type === 'pointerup') {
      props.onClick(event.event as MouseEvent)
    }
    if (idle) {
      return
    }
    assertNotNull(xyRef.current)
    const mx = (event.movement[0] * 1) / props.treeState.scale
    const my = (event.movement[1] * 1) / props.treeState.scale
    const x = xyRef.current.x + mx
    const y = xyRef.current.y + my
    props.state.setPosition({ x, y })
    if (event.last) {
      if (!idle) {
        props.treeState.setItemPosition(props.state.data.id, { x, y }, xyRef.current)
      }
      xyRef.current = null
    }
  })

  useEffect(() => {
    props.state.mitt.on(EventNames.setPosition, update)
  })

  return (
    <g style={{ transform: getTransform() }} {...dragBind()}>
      {props.children}
    </g>
  )

  // Private

  function getTransform(): string {
    return `translate(${props.state.position.x}px, ${props.state.position.y}px)`
  }
}
