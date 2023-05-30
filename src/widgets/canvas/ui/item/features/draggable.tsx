import { FullGestureState, useDrag } from '@use-gesture/react'

import React from 'react'

import { Any } from '~/utils/core'

import { CanvasItemState } from '../state'

export interface CanvasItemDraggableProps {
  itemState: CanvasItemState<Any>
  boardState: {
    scale: number
    // setItemState: (id: Id, eventName: string, redoEvent: Dictionary<Any>, undoEvent: Dictionary<Any>) => void
  }
  isDrag: (
    event: Omit<FullGestureState<'drag'>, 'event'> & {
      event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
    }
  ) => boolean
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

    const moveX = event.movement[0] / props.boardState.scale
    const moveY = event.movement[1] / props.boardState.scale
    const x = props.itemState.position.last.x + moveX
    const y = props.itemState.position.last.y + moveY

    props.itemState.position.move(x, y, event.last)
  })

  return <>{props.children(dragBind())}</>
}
