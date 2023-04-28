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
      {Object.values(props.data).map((node) => {
        if (isLinkedNode(node)) {
          return (
            <LinkedNodeUI key={node.id} node={node} state={props.state} data={props.data} decisions={props.decisions} />
          )
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const state = useMemo(create, [])
        props.state.states[node.id] = state
        return <NodeUI key={node.id} state={state} node={node} treeState={props.state} />
      })}
    </>
  )
}
