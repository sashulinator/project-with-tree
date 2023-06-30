import { memo } from 'react'

import { EnterNode, NodeState, SiftNode } from '~/entities/point'
import { useUpdate } from '~/utils/hooks'

import { LinkStateDictionary } from '../../links/state/state'
import { NodeStateDictionary } from '../state/state'

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
        return <MapNode key={nodeState.id} state={nodeState} scale={props.scale} linkStates={props.linkStates} />
      })}
    </>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeStates.on('update', update))
    uns.push(props.nodeStates.on('add', update))
    uns.push(props.nodeStates.on('remove', update))
  }
}

export const Nodes = memo(NodesComponent)

// Private

interface MapNodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
}

function MapNode(props: MapNodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  if (props.state.point.type === 'MAIN') {
    return <EnterNode state={props.state} scale={props.scale} linkStates={props.linkStates} />
  }
  return <SiftNode key={props.state.id} state={props.state} scale={props.scale} linkStates={props.linkStates} />

  function subscribeOnUpdates(update: () => void): void {
    // TODO сейчас обновляет все ноды, а надо только те что надо
    props.linkStates.on('editingId', update)
    props.linkStates.on('rule', update)
  }
}
