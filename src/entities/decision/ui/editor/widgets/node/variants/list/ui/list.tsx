import { memo } from 'react'

import { Id } from '~/utils/core'

import { useUpdate } from '~/utils/hooks'

import { LinkListState } from '../../../../..'
import { State } from '..'
import { VariantPicker, State as NodeState } from '../../..'

import { Prop } from '~/utils/notifier'
import { GestureDragEvent } from '~/ui/canvas'

export interface ListProps {
  scale: number
  state: State
  selection: Prop<Id[]>
  linkListState: LinkListState
  remove: (id: Id) => void
  onGestureDrug: (state: NodeState) => (event: GestureDragEvent) => void
}

export function ListComponent(props: ListProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.state.values().map((nodeState) => {
        return (
          <VariantPicker
            remove={props.remove}
            key={nodeState.id}
            state={nodeState}
            linkListStates={props.linkListState}
            selection={props.selection}
            onGestureDrug={props.onGestureDrug(nodeState)}
          />
        )
      })}
    </>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('update', update))
    uns.push(props.state.on('add', update))
    uns.push(props.state.on('remove', () => setTimeout(update)))
  }
}

const List = memo(ListComponent)
export default List
