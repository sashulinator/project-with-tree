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
  controller: Controller
  linkList: LinkListController
  toggle: (id: Id) => void
  select: (ids: Id[]) => void
  onGestureDrag: (state: NodeState) => (event: GestureDragEvent) => void
}

export function ListComponent(props: ListProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <DndProvider backend={HTML5Backend}>
      {props.controller.values().map((node) => {
        return (
          <Factory
            toggle={(): void => props.toggle(node.id)}
            key={node.id}
            controller={node}
            select={(): void => props.select([node.id])}
            list={props.controller}
            linkList={props.linkList}
            onGestureDrag={props.onGestureDrag(node)}
          />
        )
      })}
    </DndProvider>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.controller.on('update', update))
    uns.push(props.controller.on('add', update))
    uns.push(props.controller.on('remove', () => setTimeout(update)))
  }
}

const List = memo(ListComponent)
export default List
