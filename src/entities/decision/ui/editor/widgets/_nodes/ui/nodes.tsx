import { memo } from 'react'

import { Id } from '~/utils/core'

import { useUpdate } from '~/utils/hooks'

import { LinkStateDictionary } from '../../_links/state/state'

import { VariantPicker } from '../../-node'
import { Dictionary } from '~/utils/emitter'
import { NodeState } from '../../_node'
import { Prop } from '~/utils/notifier'
import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'

interface NodesProps {
  scale: number
  linkStates: LinkStateDictionary
  nodeStates: Dictionary<NodeState>
  selection: Prop<Id[]>
  remove: (id: Id) => void
  onGestureDrug: (state: NodeState) => (event: GestureDragEvent) => void
}

export function NodesComponent(props: NodesProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.nodeStates.values().map((nodeState) => {
        return (
          <VariantPicker
            remove={props.remove}
            key={nodeState.id}
            state={nodeState}
            linkStates={props.linkStates}
            selection={props.selection}
            onGestureDrug={props.onGestureDrug(nodeState)}
          />
        )
      })}
    </>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeStates.on('update', update))
    uns.push(props.nodeStates.on('add', update))
    uns.push(props.nodeStates.on('remove', () => setTimeout(update)))
  }
}

export const Nodes = memo(NodesComponent)
