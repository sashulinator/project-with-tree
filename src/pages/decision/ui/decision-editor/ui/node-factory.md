import { Decision, Node } from '~/entities/decision'
import { isLinkedNode } from '~/entities/decision/lib/is/linked-node'
import { LinkedNode } from '~/entities/decision/types/linked-node'
import { Dictionary } from '~/utils/dictionary'

import LinkedNode from './linked-node'
import Node from './node'

export interface NodeProps {
node: Node | LinkedNode
data: Dictionary<Node | LinkedNode>
layouts: Dictionary<Decision>
// state: State
}

export default function NodeFactory(props: NodeProps): JSX.Element {
console.log('aallooo')

if (isLinkedNode(props.node)) {
return <LinkedNode {...(props as any)} />
}

// eslint-disable-next-line prettier/prettier
return <Node {...(props as any)} />
}
