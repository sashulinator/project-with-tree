import { NodeState, SiftNode } from '~/entities/point'
import { LinkState } from '~/entities/rule'
import { Any } from '~/utils/core'
import { EmitterableDictionary } from '~/utils/emitter/dictionary'

interface NodesProps {
  scale: number
  linkStates: EmitterableDictionary<Any, LinkState<Any>>
  nodeStates: EmitterableDictionary<Any, NodeState>
}

export function Nodes(props: NodesProps): JSX.Element {
  return (
    <>
      {props.nodeStates.values().map((nodeState) => {
        return <SiftNode key={nodeState.id} state={nodeState} scale={props.scale} />
      })}
    </>
  )
}
