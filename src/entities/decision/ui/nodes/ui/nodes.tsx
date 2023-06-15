import { memo } from 'react'

import { EnterNode, NodeState, SiftNode } from '~/entities/point'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { Any } from '~/utils/core'

import { LinkStateDictionary } from '../../links/state/state'

interface NodesProps {
  scale: number
  linkStates: LinkStateDictionary
  nodeStates: EmitterableDictionary<Any, NodeState>
}

export function NodesComponent(props: NodesProps): JSX.Element {
  return (
    <>
      {props.nodeStates.values().map((nodeState) => {
        if (nodeState.point.type === 'MAIN') {
          return <EnterNode key={nodeState.id} state={nodeState} scale={props.scale} linkStates={props.linkStates} />
        }
        return <SiftNode key={nodeState.id} state={nodeState} scale={props.scale} linkStates={props.linkStates} />
      })}
    </>
  )
}

export const Nodes = memo(NodesComponent)
