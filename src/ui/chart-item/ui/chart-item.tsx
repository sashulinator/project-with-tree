import React from 'react'

import { PointState } from '~/entities/point/state'
import { fns } from '~/utils/function'
import WChartItem, { Draggable } from '~/widgets/canvas/ui/item'

export interface ChartItemProps extends React.HTMLAttributes<SVGGElement> {
  children: React.ReactNode
  state: PointState
  chartState: {
    scale: number
    // setItemState: (id: Id, eventName: string, redoEvent: Dictionary<Any>, undoEvent: Dictionary<Any>) => void
  }
}

export default function ChartItem(props: ChartItemProps): JSX.Element {
  const { chartState, ...chartItemProps } = props
  return (
    <Draggable chartState={chartState} state={props.state}>
      {(draggableProps): JSX.Element => {
        return (
          <WChartItem
            {...chartItemProps}
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
    </Draggable>
  )
}
