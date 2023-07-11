import { NodeState } from '~/entities/decision/ui/editor/widgets/_node'
import { RuleLinkState } from '~/entities/rule'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { LinkStateDictionary } from '../../_links/state/state'
import { EnterNode } from '../../_node-types/enter'
import { SiftNode } from '../../_node-types/sift'

import { NodeStateDictionary } from '../state/state'

interface MapNodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
  nodeStates: NodeStateDictionary
  removeNode: (id: Id) => void
  onMove?: ((x: number, y: number, isLast: boolean) => void) | undefined
}

export function Node(props: MapNodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  if (props.state.point.type === 'MAIN') {
    return <EnterNode state={props.state} scale={props.scale} linkStates={props.linkStates} />
  }
  return (
    <SiftNode
      onMove={props.onMove}
      removeNode={props.removeNode}
      key={props.state.id}
      state={props.state}
      scale={props.scale}
      linkStates={props.linkStates}
    />
  )

  function subscribeOnUpdates(update: () => void): void {
    const updateNodes = (linkState: RuleLinkState): void => {
      const sourceState = props.nodeStates.find(linkState.sourceId.value)
      const targetState = props.nodeStates.find(linkState.targetId.value)
      if (targetState) props.nodeStates.gridDepth(targetState.position.value.x)
      if (sourceState) props.nodeStates.gridDepth(sourceState.position.value.x)
    }
    // TODO сейчас обновляет все ноды, а надо только те что надо
    props.linkStates.on('editingId', update)
    props.linkStates.on('targetId', update)
    props.linkStates.on('sourceId', update)
    props.linkStates.on('index', update)
    props.linkStates.on('add', ({ item }) => setTimeout(() => updateNodes(item)))
    props.linkStates.on('update', ({ item }) => setTimeout(() => updateNodes(item)))
  }
}
