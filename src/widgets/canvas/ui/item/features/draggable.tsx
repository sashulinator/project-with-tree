import { useDrag } from '@use-gesture/react'

import React from 'react'

import { PointState } from '../../../../../entities/point/state'

export interface DraggableProps {
  state: PointState
  chartState: {
    scale: number
    // setItemState: (id: Id, eventName: string, redoEvent: Dictionary<Any>, undoEvent: Dictionary<Any>) => void
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
  const dragBind = useDrag((event): void => {
    event.event.stopPropagation()
    const target = event.event.target as HTMLElement
    if (!target.classList.contains('name')) return

    const isIdle = event.movement[0] === 0 && event.movement[1] === 0

    if (isIdle) return

    const moveX = event.movement[0] / props.chartState.scale
    const moveY = event.movement[1] / props.chartState.scale
    const x = props.state.position.last.x + moveX
    const y = props.state.position.last.y + moveY

    props.state.position.move(x, y, event.last)
  })

  return <>{props.children(dragBind())}</>
}
