import React from 'react'

import { fns } from '~/utils/function'
import { Position } from '~/widgets/canvas'
import AbstractCanvasItem, { CanvasItemDraggable, IsDragEvent } from '~/widgets/canvas/ui/item'

export interface CanvasItemProps extends React.HTMLAttributes<SVGGElement> {
  width: number
  height: number
  position: Position
  lastPosition: Position
  scale: number
  children: React.ReactNode
  onMove: (x: number, y: number, isLast: boolean) => void
  isDrag: (event: IsDragEvent) => boolean
}

/**
 * Элемент Canvas с фичами
 * 1. Перетаскивание
 */
export function CanvasItem(props: CanvasItemProps): JSX.Element {
  const { scale, position, lastPosition, isDrag, onMove: move, ...chartItemProps } = props

  return (
    <CanvasItemDraggable lastPosition={lastPosition} onMove={move} isDrag={isDrag} scale={scale}>
      {(draggableProps): JSX.Element => {
        return (
          <AbstractCanvasItem
            {...chartItemProps}
            y={position.y}
            x={position.x}
            style={{ touchAction: 'none' }}
            onKeyDown={fns(draggableProps.onKeyDown, chartItemProps.onKeyDown)}
            onKeyUp={fns(draggableProps.onKeyUp, chartItemProps.onKeyUp)}
            onLostPointerCapture={fns(draggableProps.onLostPointerCapture, chartItemProps.onLostPointerCapture)}
            onPointerCancel={fns(draggableProps.onPointerCancel, chartItemProps.onPointerCancel)}
            onPointerDown={fns(draggableProps.onPointerDown, chartItemProps.onPointerDown)}
            onPointerMove={fns(draggableProps.onPointerMove, chartItemProps.onPointerMove)}
            onPointerUp={fns(draggableProps.onPointerUp, chartItemProps.onPointerUp)}
          />
        )
      }}
    </CanvasItemDraggable>
  )
}
