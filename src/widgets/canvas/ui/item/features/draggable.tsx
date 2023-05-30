import { FullGestureState, useDrag } from '@use-gesture/react'

import React from 'react'

import { Position } from '~/widgets/canvas'

export type IsDragEvent = Omit<FullGestureState<'drag'>, 'event'> & {
  event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
}

export interface CanvasItemDraggableProps {
  scale: number
  lastPosition: Position
  isDrag: (event: IsDragEvent) => boolean
  onMove: (x: number, y: number, isLast: boolean) => void
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

export function CanvasItemDraggable(props: CanvasItemDraggableProps): JSX.Element {
  const dragBind = useDrag((event): void => {
    event.event.stopPropagation()
    if (!props.isDrag(event)) return

    const isIdle = event.movement[0] === 0 && event.movement[1] === 0
    if (isIdle) return

    const moveX = event.movement[0] / props.scale
    const moveY = event.movement[1] / props.scale
    const x = props.lastPosition.x + moveX
    const y = props.lastPosition.y + moveY

    props.onMove(x, y, event.last)
  })

  return <>{props.children(dragBind())}</>
}
