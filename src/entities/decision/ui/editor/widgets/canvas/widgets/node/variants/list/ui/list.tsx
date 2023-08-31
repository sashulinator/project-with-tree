import { memo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { GestureDragEvent } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { State } from '..'
import { Factory, State as NodeState } from '../../..'
import { LinkListController } from '../../../../../../..'

export interface ListProps {
  state: State
  linkListController: LinkListController
  remove: (id: Id) => void
  selectNodes: (ids: Id[]) => void
  onGestureDrug: (state: NodeState) => (event: GestureDragEvent) => void
}

export function ListComponent(props: ListProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <DndProvider backend={HTML5Backend}>
      {props.state.values().map((nodeState) => {
        return (
          <Factory
            key={nodeState.id}
            state={nodeState}
            selectNodes={props.selectNodes}
            nodeListState={props.state}
            linkListController={props.linkListController}
            onGestureDrug={props.onGestureDrug(nodeState)}
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
