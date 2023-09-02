import { memo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { GestureDragEvent } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Controller } from '..'
import { Factory, Controller as NodeState } from '../../..'
import { LinkListController } from '../../../../../../..'

export interface ListProps {
  state: Controller
  linkList: LinkListController
  toggle: (id: Id) => void
  selectNodes: (ids: Id[]) => void
  onGestureDrug: (state: NodeState) => (event: GestureDragEvent) => void
}

export function ListComponent(props: ListProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <DndProvider backend={HTML5Backend}>
      {props.state.values().map((node) => {
        return (
          <Factory
            toggle={(): void => props.toggle(node.id)}
            key={node.id}
            state={node}
            selectNodes={props.selectNodes}
            nodeList={props.state}
            linkList={props.linkList}
            onGestureDrug={props.onGestureDrug(node)}
          />
        )
      })}
    </DndProvider>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('update', update))
    uns.push(props.state.on('add', update))
    uns.push(props.state.on('remove', () => setTimeout(update)))
  }
}

const List = memo(ListComponent)
export default List
