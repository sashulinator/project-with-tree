import React from 'react'

import { Any } from '~/utils/core'
import { fns } from '~/utils/function'
import AbstractCanvasItem, { CanvasItemDraggable, CanvasItemState, IsDragEvent } from '~/widgets/canvas/ui/item'

export interface CanvasItemProps extends React.HTMLAttributes<SVGGElement> {
  children: React.ReactNode
  state: CanvasItemState<Any>
  scale: number
  move: (x: number, y: number, isLast: boolean) => void
  isDrag: (event: IsDragEvent) => boolean
}

export default function CanvasItem(props: CanvasItemProps): JSX.Element {
  const { scale, state, isDrag, move, ...chartItemProps } = props

  return (
    <CanvasItemDraggable lastPosition={state.position.last} move={move} isDrag={isDrag} scale={scale}>
      {(draggableProps): JSX.Element => {
        return (
          <AbstractCanvasItem
            {...chartItemProps}
            height={state.height.value}
            width={state.width.value}
            y={state.position.value.y}
            x={state.position.value.x}
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
