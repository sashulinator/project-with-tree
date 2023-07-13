import { FullGestureState, useDrag } from '@use-gesture/react'

import React from 'react'
import { Position } from '~/utils/core'

Draggable.displayName = 'a-Canvas-f-Draggable'

/**
 *  Cобытие функции `preventDrag`
 */
export type PreventDragEvent = Omit<FullGestureState<'drag'>, 'event'> & {
  event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
}

export type PreventDrag = (event: PreventDragEvent) => boolean

const GAP = 500

export interface DraggableProps {
  scale: number
  lastPosition: Position
  isDrag: PreventDrag
  onMove: (x: number, y: number, isLast: boolean) => void
  children: (
    props: Pick<
      React.HTMLAttributes<Element>,
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
    if (!props.isDrag(event)) return

    const isIdle = event.movement[0] === 0 && event.movement[1] === 0
    if (isIdle) return

    const moveX = event.movement[0] / props.scale
    const moveY = event.movement[1] / props.scale
    let x = props.lastPosition.x + moveX
    const y = props.lastPosition.y + moveY

    if (event.last) {
      const rx = x % GAP
      x = rx < GAP / 2 ? x - rx : x + GAP - rx
    }

    props.onMove(x, y, event.last)
  })

  return <>{props.children(dragBind())}</>
}
