import './list.css'

import { Id, c } from '~/utils/core'
import Node from '../../..'
import { NodeListState } from '~/entities/decision/ui/editor'

List.displayName = 'decisionEditor-w-PointPanel-w-Node-v-List'

export interface Props {
  nodeListState: NodeListState
  searchQuery: string
  className?: string
  centerNode: (id: Id) => void
}

export default function List(props: Props): JSX.Element {
  const filtered = Object.values(props.nodeListState.items).filter(
    (node) => node.point.name.toUpperCase().indexOf(props.searchQuery.toUpperCase()) !== -1
  )

  return (
    <ul className={c(props.className, List.displayName)}>
      {filtered.map((state) => {
        return (
          <li key={state.id}>
            <Node state={state} onClick={(): void => props.centerNode(state.id)}></Node>
          </li>
        )
      })}
    </ul>
  )
}
