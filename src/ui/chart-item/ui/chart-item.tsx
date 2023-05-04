import React from 'react'

import { Id } from '~/utils/core'
import { fns } from '~/utils/function'
import WChartItem, { Draggable, Position, State } from '~/widgets/chart-item'

export interface ChartItemProps extends React.HTMLAttributes<SVGGElement> {
  children: React.ReactNode
  state: State<unknown>
  chartState: {
    scale: number
    setItemPosition: (id: Id, position: Position, previousPosition: Position) => void
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
