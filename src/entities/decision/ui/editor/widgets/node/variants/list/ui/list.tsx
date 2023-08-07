import { memo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { GestureDragEvent } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { LinkListState } from '../../../../..'
import { VariantPicker, State as NodeState } from '../../..'
import { State } from '..'

export interface ListProps {
  state: State
  linkListState: LinkListState
  remove: (id: Id) => void
  onGestureDrug: (state: NodeState) => (event: GestureDragEvent) => void
}

export function ListComponent(props: ListProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <DndProvider backend={HTML5Backend}>
      {props.state.values().map((nodeState) => {
        return (
          <VariantPicker
            remove={props.remove}
            key={nodeState.id}
            state={nodeState}
            nodeListState={props.state}
            linkListState={props.linkListState}
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
