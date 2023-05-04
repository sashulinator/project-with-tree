import ChartItem from '~/ui/chart-item'
import { Any } from '~/utils/core'
import { State as TreeState } from '~/widgets/chart'
import { State as ItemState } from '~/widgets/chart-item'
import Selectable from '~/widgets/chart-item/features/selectable'

import { Item } from '../../../types/item'

export interface ItemNodeProps {
  state: ItemState<Item>
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
            <rect
              width={props.state.width}
              height={props.state.height}
              fill={selectableProps.isSelected ? 'red' : 'blue'}
            />
            <text>{props.state.data.id}</text>
          </ChartItem>
        )
      }}
    </Selectable>
  )
}
