import { useDrag } from '@use-gesture/react'

import React, { useRef } from 'react'

import { Any, Id, assertNotNull } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

import { EventNames, PointState } from '../../../entities/point/state'
import { Position } from '../types/position'

export interface DraggableProps {
  state: PointState
  chartState: {
    scale: number
    setItemState: (id: Id, eventName: string, redoEvent: Dictionary<Any>, undoEvent: Dictionary<Any>) => void
  }
  children: (
    props: Pick<
      React.HTMLAttributes<SVGGElement>,
      | 'onKeyDown'
      | 'onKeyUp'
      | 'onLostPointerCapture'
      | 'onPointerCancel'
      | 'onPointerDown'
      | 'onPointerMove'
      | 'onPointerUp'
    >
  ) => React.ReactNode
}

export function Draggable(props: DraggableProps): JSX.Element {
  const xyRef = useRef<Position | null>(null)

  const dragBind = useDrag((event): void => {
    event.event.stopPropagation()
    const target = event.event.target as HTMLElement
    if (!target.classList.contains('name')) return

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
      props.chartState.setItemState(
        props.state.id,
        EventNames.setPosition,
        { position: { x, y } },
        { position: xyRef.current }
      )
      xyRef.current = null
    }
  })

  return <>{props.children(dragBind())}</>
}
