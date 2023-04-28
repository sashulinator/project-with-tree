import { useMemo } from 'react'

import { Decision, LinkedNode, Node, isLinkedNode } from '~/entities/decision'
import { State } from '~/packages/chart'
import { create } from '~/packages/tree-chart-node'
import { Dictionary } from '~/utils/dictionary'

import LinkedNodeUI from './linked-node'
import NodeUI from './node'

export interface FactoryProps {
  state: State
  data: Dictionary<Node | LinkedNode>
  decisions: Dictionary<Decision>
}

export default function Factory(props: FactoryProps): JSX.Element {
  return (
    <>
      {Object.values(props.data).map((node) => (
        <Item key={node.id} node={node} {...props} />
      ))}
    </>
  )
}

interface ItemProps extends FactoryProps {
  node: LinkedNode | Node
}

function Item(props: ItemProps): JSX.Element {
  if (isLinkedNode(props.node)) {
    return <LinkedNodeUI node={props.node} state={props.state} data={props.data} decisions={props.decisions} />
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const state = useMemo(create, [])
  props.state.states[props.node.id] = state
  return <NodeUI key={props.node.id} state={state} node={props.node} treeState={props.state} />
}
