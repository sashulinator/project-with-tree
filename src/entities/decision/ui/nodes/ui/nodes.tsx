import { NodeState, SiftNode } from '~/entities/point'
import { Any } from '~/utils/core'
import { EmitterableDictionary } from '~/utils/emitter/dictionary'

import { LinkStateDictionary } from '../../links/state/state'

interface NodesProps {
  scale: number
  linkStates: LinkStateDictionary
  nodeStates: EmitterableDictionary<Any, NodeState>
}

export function Nodes(props: NodesProps): JSX.Element {
  return (
    <>
      {props.nodeStates.values().map((nodeState) => {
        return <SiftNode key={nodeState.id} state={nodeState} scale={props.scale} linkStates={props.linkStates} />
      })}
    </>
  )
}
