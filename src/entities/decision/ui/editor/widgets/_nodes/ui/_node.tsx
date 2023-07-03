import { EnterNode, NodeState, SiftNode } from '~/entities/point'
import { useUpdate } from '~/utils/hooks'

import { LinkStateDictionary } from '../../_links/state/state'
import { NodeStateDictionary } from '../state/state'

interface MapNodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
  nodeStates: NodeStateDictionary
}

export function Node(props: MapNodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  if (props.state.point.type === 'MAIN') {
    return <EnterNode state={props.state} scale={props.scale} linkStates={props.linkStates} />
  }
  return (
    <SiftNode
      removeNode={props.nodeStates.remove}
      key={props.state.id}
      state={props.state}
      scale={props.scale}
      linkStates={props.linkStates}
    />
  )

  function subscribeOnUpdates(update: () => void): void {
    // TODO сейчас обновляет все ноды, а надо только те что надо
    props.linkStates.on('editingId', update)
    props.linkStates.on('rule', update)
  }
}
