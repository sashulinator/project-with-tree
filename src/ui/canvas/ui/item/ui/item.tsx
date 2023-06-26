import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

import { Position } from '~/abstract/canvas'
import { Item as AbstractItem, IsDragEvent, ItemDraggable } from '~/abstract/canvas/ui/item'
import { Id } from '~/utils/core'
import { fns } from '~/utils/function'

export interface CanvasItemProps extends React.HTMLAttributes<HTMLDivElement> {
  dataId: Id
  width?: number | undefined
  height?: number | undefined
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
export function ItemComponent(props: CanvasItemProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { scale, position, lastPosition, isDrag, onMove: move, ...chartItemProps } = props

  return (
    <ItemDraggable lastPosition={lastPosition} onMove={move} isDrag={isDrag} scale={scale}>
      {(draggableProps): JSX.Element => {
        return (
          <AbstractItem
            {...chartItemProps}
            dataId={props.dataId}
            ref={ref}
            className={clsx(props.className, 'ui-CanvasItem')}
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
    </ItemDraggable>
  )
}

const Item = forwardRef(ItemComponent)
Item.displayName = 'UICanvasItem'
export { Item }
