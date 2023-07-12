import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

import { Item, ItemPreventDrag, ItemDraggable } from '~/abstract/canvas'
import { Id, Position } from '~/utils/core'
import { fns } from '~/utils/function'

Component.displayName = 'ui-Canvas-w-Item'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  dataId: Id
  width?: number | undefined
  height?: number | undefined
  position: Position
  lastPosition: Position
  scale: number
  children: React.ReactNode
  onMove: (x: number, y: number, isLast: boolean) => void
  preventDrag: ItemPreventDrag
}

/**
 * Элемент Canvas с фичами
 * 1. Перетаскивание
 */
export function Component(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { scale, position, lastPosition, preventDrag, onMove: move, ...chartItemProps } = props

  return (
    <ItemDraggable lastPosition={lastPosition} onMove={move} preventDrag={preventDrag} scale={scale}>
      {(draggableProps): JSX.Element => {
        return (
          <Item
            {...chartItemProps}
            dataId={props.dataId}
            ref={ref}
            className={clsx(props.className, 'ui-CanvasItem')}
            y={position.y}
            x={position.x}
            style={{ touchAction: 'none', ...chartItemProps.style }}
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

export default forwardRef(Component)
