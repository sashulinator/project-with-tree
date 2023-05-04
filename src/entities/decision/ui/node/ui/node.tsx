import ChartItem from '~/ui/chart-item'
import { Any } from '~/utils/core'
import { State as TreeState } from '~/widgets/chart'
import { State as ItemState } from '~/widgets/chart-item'
import Selectable from '~/widgets/chart-item/features/selectable'

import { Item } from '../../../types/item'
import ConditionNode from './condition-node'

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
            {<Factory state={props.state} isSelected={selectableProps.isSelected} />}
          </ChartItem>
        )
      }}
    </Selectable>
  )
}

interface FactoryProps {
  state: ItemState<Item>
  isSelected: boolean
}

function Factory(props: FactoryProps): JSX.Element {
  const { type } = props.state.data

  if (type === 'CONDITION') {
    return <ConditionNode {...props} />
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
