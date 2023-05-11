import { PointNode } from '~/entities/point'
import ChartItem from '~/ui/chart-item'
import { Any } from '~/utils/core'
import { State as TreeState } from '~/widgets/chart'
import { State as ItemState } from '~/widgets/chart-item'
import Selectable from '~/widgets/chart-item/features/selectable'

import { Point } from '../../../../point/types/point'

export interface ItemNodeProps {
  state: ItemState<Point>
  decisionState: TreeState<Any, Any>
}

export default function Node(props: ItemNodeProps): JSX.Element {
  return (
    <Selectable id={props.state.id} chartState={props.decisionState}>
      {(selectableProps): JSX.Element => {
        return (
          <ChartItem
            onMouseDown={(e): void => selectableProps.selectOnMouseAction(e)}
            state={props.state}
            chartState={props.decisionState}
          >
            {<Factory state={props.state} isSelected={selectableProps.isSelected} />}
          </ChartItem>
        )
      }}
    </Selectable>
  )
}

interface FactoryProps {
  state: ItemState<Point>
  isSelected: boolean
}

function Factory(props: FactoryProps): JSX.Element {
  const { type } = props.state.data

  if (type === 'CONDITION') {
    return <PointNode {...props} />
  }

  return (
    <>
      <rect
        width={props.state.width}
        height={props.state.height}
        fill={'yellow'}
        stroke='black'
        strokeWidth={props.isSelected ? '1px' : 0}
      />
      <text x={20} y={props.state.height - 30}>
        {props.state.data.id}
      </text>
    </>
  )
}
