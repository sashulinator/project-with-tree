import { useDrag } from '@use-gesture/react'

import React, { useRef } from 'react'

import { Any, Id, assertNotNull } from '~/utils/core'

import { State } from '../state'
import { Position } from '../types/position'

interface DraggableProps {
  children: (props: Any) => React.ReactNode
  state: State<unknown>
  chartState: {
    scale: number
    setItemPosition: (id: Id, position: Position, previousPosition: Position) => void
  }
}

export default function Draggable(props: DraggableProps): JSX.Element {
  const xyRef = useRef<Position | null>(null)

  const dragBind = useDrag((event): void => {
    event.event.stopPropagation()

    const isIdle = event.movement[0] === 0 && event.movement[1] === 0

    if (isIdle) return

    if (xyRef.current === null) xyRef.current = props.state.position
    assertNotNull(xyRef.current)

    const moveX = event.movement[0] / props.chartState.scale
    const moveY = event.movement[1] / props.chartState.scale
    const x = xyRef.current.x + moveX
    const y = xyRef.current.y + moveY

    props.state.setPosition({ x, y })

    if (event.last) {
      props.chartState.setItemPosition(props.state.id, { x, y }, xyRef.current)
      xyRef.current = null
    }
  })

  return <>{props.children({ ...dragBind() })}</>
}
