import { Decision, LinkedNode, Node, isLinkedNode } from '~/entities/decision'
import { State } from '~/packages/chart'
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
        return <NodeUI key={node.id} node={node} />
      })}
    </>
  )
}
