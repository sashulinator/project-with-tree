import { memo } from 'react'

import { useUpdate } from '~/utils/hooks'

import { LinkStateDictionary } from '../../_links/state/state'
import { NodeStateDictionary } from '../state/state'
import { Node } from './_node'

interface NodesProps {
  scale: number
  linkStates: LinkStateDictionary
  nodeStates: NodeStateDictionary
}

export function NodesComponent(props: NodesProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.nodeStates.values().map((nodeState) => {
        return (
          <Node
            key={nodeState.id}
            state={nodeState}
            nodeStates={props.nodeStates}
            scale={props.scale}
            linkStates={props.linkStates}
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
