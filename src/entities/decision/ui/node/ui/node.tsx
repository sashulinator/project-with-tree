import { useEffect, useState } from 'react'

import { EventNames, State as TreeState } from '~/packages/chart'
import ChartItem, { State as ItemState } from '~/packages/chart-item'
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
    <ChartItem onClick={onNodeClick} state={props.state} treeState={props.treeState}>
      <rect width={props.state.width} height={props.state.height} fill={isSelected ? 'red' : 'blue'} />
      <text>{props.state.data.id}</text>
    </ChartItem>
  )

  // Private

  function onNodeClick(e: React.MouseEvent<SVGGElement>): void {
    if (e.metaKey) {
      props.treeState.selectToggle(props.state.data.id)
    } else {
      props.treeState.select([props.state.data.id])
    }
  }
}
