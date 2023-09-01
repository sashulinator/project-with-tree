import './list.css'

import { NodeListController } from '~/entities/decision/ui/editor'
import { Id, c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import Node from '../../..'

List.displayName = 'decision-Editor-w-LeftPanel-w-Node-v-List'

export interface Props {
  nodeListController: NodeListController
  className?: string
  centerNode: (id: Id) => void
  selectNodes: (ids: Id[]) => void
}

export default function List(props: Props): JSX.Element {
  const searchQuery = props.nodeListController.searchQuery.value

  const filtered = Object.values(props.nodeListController.items).filter((node) => {
    return node.point.level !== 'main' && node.point.name?.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1
  })

  useUpdate(subscribeOnUpdates)

  return (
    <ul className={c(props.className, List.displayName)}>
      {filtered.map((controller) => {
        return (
          <li key={controller.id}>
            <Node
              selectNodes={props.selectNodes}
              nodeListController={props.nodeListController}
              controller={controller}
              centerNode={props.centerNode}
            />
          </li>
        )
      })}
    </ul>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListController.on('update', update))
    uns.push(props.nodeListController.on('remove', () => setTimeout(update)))
    uns.push(props.nodeListController.on('add', update))
    uns.push(props.nodeListController.on('searchQuery', update))
  }
}
