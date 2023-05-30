import { FullGestureState } from '@use-gesture/react'

import React from 'react'

import { Any } from '~/utils/core'
import { fns } from '~/utils/function'
import WChartItem, { CanvasItemDraggable, CanvasItemState } from '~/widgets/canvas/ui/item'

export interface ChartItemProps extends React.HTMLAttributes<SVGGElement> {
  children: React.ReactNode
  state: CanvasItemState<Any>
  chartState: {
    scale: number
    // setItemState: (id: Id, eventName: string, redoEvent: Dictionary<Any>, undoEvent: Dictionary<Any>) => void
  }
  isDrag: (
    event: Omit<FullGestureState<'drag'>, 'event'> & {
      event: PointerEvent | MouseEvent | TouchEvent | KeyboardEvent
    }
  ) => boolean
}

export default function CanvasItem(props: ChartItemProps): JSX.Element {
  const { chartState, state, isDrag, ...chartItemProps } = props
  return (
    <CanvasItemDraggable isDrag={isDrag} boardState={chartState} itemState={props.state}>
      {(draggableProps): JSX.Element => {
        return (
          <WChartItem
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
