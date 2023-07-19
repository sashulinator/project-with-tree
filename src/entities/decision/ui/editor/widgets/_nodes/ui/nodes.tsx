import { memo } from 'react'

import { Id } from '~/utils/core'

import { useUpdate } from '~/utils/hooks'

import { LinkStateDictionary } from '../../_links/state/state'

import { Node } from './_node'
import { Dictionary } from '~/utils/emitter'
import { NodeState } from '../../_node'

interface NodesProps {
  scale: number
  linkStates: LinkStateDictionary
  nodeStates: Dictionary<NodeState>
  removeNode: (id: Id) => void
}

export function NodesComponent(props: NodesProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.nodeStates.values().map((nodeState) => {
        return (
          <Node
            removeNode={props.removeNode}
            key={nodeState.id}
            state={nodeState}
            nodeStates={props.nodeStates}
            scale={props.scale}
            linkStates={props.linkStates}
            // onMove={(x, y, last): void => {
            //   if (last) {
            //     setTimeout(() => props.nodeStates.gridDepth(nodeState.position.value.x))
            //   } else {
            //     emptyFn()
            //   }
            // }}
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
