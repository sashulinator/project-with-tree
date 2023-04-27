import { Decision, Node } from '~/entities/decision'
import { LinkedNode } from '~/entities/decision/types/linked-node'
import TreeChart from '~/packages/tree-chart'
import { Dictionary, assertDefined, assertNotNull } from '~/utils/dictionary'
import { toDictionary } from '~/utils/list'

// import { State } from '~/packages/tree-chart-node'

export interface NodeProps {
node: LinkedNode
data: Dictionary<Node | LinkedNode>
layouts: Dictionary<Decision>
// state: State
}

export default function LinkedNode(props: NodeProps): JSX.Element {
const layout = props.layouts[props.node.linkedId]
assertDefined(layout)
const data = toDictionary((n) => n.id, layout.data)
assertNotNull(data)

return <TreeChart data={data} state={props.state} renderNode={NodeFactory} />
}
