import { Decision, Node } from '~/entities/decision'
import { LinkedNode } from '~/entities/decision/types/linked-node'
import { State } from '~/packages/chart'
import { Dictionary, assertDefined, assertNotNull } from '~/utils/dictionary'
import { toDictionary } from '~/utils/list'

import Factory from './factory'

// import { State } from '~/packages/tree-chart-node'

export interface NodeProps {
  state: State
  node: LinkedNode
  data: Dictionary<Node | LinkedNode>
  decisions: Dictionary<Decision>
}

export default function LinkedNodeUI(props: NodeProps): JSX.Element {
  const decision = props.decisions[props.node.linkedId]
  assertDefined(decision)
  const data = toDictionary((n) => n.id, decision.data)
  assertNotNull(data)

  return <Factory data={data} state={props.state} decisions={props.decisions} />
}
