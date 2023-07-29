import { NodeState } from '../../_node'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { LinkStateDictionary } from '../../_links/state/state'
import { EnterNode } from '../../_node/variants/enter'

import { Dictionary } from '~/utils/emitter'
import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'

import { NewSiftNode } from '../../-node/variants/filter'

const GAP = 500

interface MapNodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
  nodeStates: Dictionary<NodeState>
  removeNode: (id: Id) => void
}

export function Node(props: MapNodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  console.log('hgg', props.state.position.value.x)

  if (props.state.point.type === 'MAIN') {
    return (
      <EnterNode
        x={props.state.position.value.x}
        y={props.state.position.value.y}
        state={props.state}
        linkStates={props.linkStates}
        onGestureDrug={onGestureDrug}
      />
    )
  }
  return (
    <NewSiftNode
      onGestureDrug={onGestureDrug}
      remove={(): void => props.removeNode(props.state.id)}
      key={props.state.id}
      state={props.state}
      linkStates={props.linkStates}
    />
  )

  // Private

  function onGestureDrug(event: GestureDragEvent): void {
    console.log('alloo')

    event.event.stopPropagation()

    const isIdle = event.movement[0] === 0 && event.movement[1] === 0
    if (isIdle) return

    const moveX = event.movement[0] / props.scale
    const moveY = event.movement[1] / props.scale
    let x = props.state.position.last.x + moveX
    const y = props.state.position.last.y + moveY

    if (event.last) {
      const rx = x % GAP
      x = rx < GAP / 2 ? x - rx : x + GAP - rx
    }

    props.state.position.move(x, y, event.last)
  }

  function subscribeOnUpdates(update: () => void): void {
    // const updateNodes = (linkState: RuleLinkState): void => {
    //   const sourceState = props.nodeStates.find(linkState.sourceId.value)
    //   const targetState = props.nodeStates.find(linkState.targetId.value)
    //   if (targetState) props.nodeStates.gridDepth(targetState.position.value.x)
    //   if (sourceState) props.nodeStates.gridDepth(sourceState.position.value.x)
    // }
    // TODO сейчас обновляет все ноды, а надо только те что надо
    props.linkStates.on('editingId', update)
    props.linkStates.on('targetId', update)
    props.linkStates.on('sourceId', update)
    props.linkStates.on('index', update)
    props.state.on('position', update)
    // props.linkStates.on('add', ({ item }) => setTimeout(() => updateNodes(item)))
    // props.linkStates.on('update', ({ item }) => setTimeout(() => updateNodes(item)))
  }
}
