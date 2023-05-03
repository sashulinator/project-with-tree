import { useEffect, useState } from 'react'

import { EventNames, State as TreeState } from '~/packages/chart'
import { State as ItemState } from '~/packages/tree-chart-item'
import ChartNode from '~/ui/chart-node'
import { Any } from '~/utils/core'

import { Item } from '../../../types/item'

export interface ItemNodeProps {
  state: ItemState<Item>
  treeState: TreeState<Any, Any>
}

export default function Node(props: ItemNodeProps): JSX.Element {
  const [isSelected, select] = useState(false)

  useEffect(() => {
    props.treeState.mitt.on(EventNames.select, ({ ids }) => select(ids.includes(props.state.data.id)))
  })

  return (
    <ChartNode onClick={onNodeClick} state={props.state} treeState={props.treeState}>
      <rect width='200' height='100' fill={isSelected ? 'red' : 'blue'} />
      <text>{props.state.data.id}</text>
    </ChartNode>
  )

  // Private

  function onNodeClick(e: MouseEvent): void {
    if (e.metaKey) {
      props.treeState.selectToggle(props.state.data.id)
    } else {
      props.treeState.select([props.state.data.id])
    }
  }
}
