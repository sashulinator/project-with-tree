import { useMemo } from 'react'

import { Decision, Item, LinkedItem, isLinkedNode } from '~/entities/decision'
import { State } from '~/packages/chart'
import { create } from '~/packages/tree-chart-node'
import { Dictionary } from '~/utils/dictionary'

import LinkedNodeUI from './linked-node'
import NodeUI from './node'

export interface FactoryProps {
  state: State
  data: Dictionary<Item | LinkedItem>
  decisions: Dictionary<Decision>
}

export default function Factory(props: FactoryProps): JSX.Element {
  return (
    <>
      {Object.values(props.data).map((item) => (
        <FactoryItem key={item.id} item={item} {...props} />
      ))}
    </>
  )
}

interface FactoryItemProps extends FactoryProps {
  item: LinkedItem | Item
}

function FactoryItem(props: FactoryItemProps): JSX.Element {
  if (isLinkedNode(props.item)) {
    return <LinkedNodeUI item={props.item} state={props.state} data={props.data} decisions={props.decisions} />
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const state = useMemo(create, [])
  props.state.states[props.item.id] = state
  return <NodeUI key={props.item.id} state={state} item={props.item} treeState={props.state} />
}
