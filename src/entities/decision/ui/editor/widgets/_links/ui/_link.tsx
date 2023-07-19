import { NodeState } from '~/entities/decision/ui/editor/widgets/_node'

import { RuleLink, RuleLinkState } from '../../_link'

import { Position } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { getOffset } from '../lib/_get-offset'
import { LinkStateDictionary } from '../state/state'
import { Dictionary } from '~/utils/emitter'

interface MapLinkProp {
  scale: number
  canvasTranslate: Position
  targetState?: NodeState | undefined
  sourceState?: NodeState | undefined
  nodeStates: Dictionary<NodeState>
  linkState: RuleLinkState
  linkStates: LinkStateDictionary
}

export function Link(props: MapLinkProp): JSX.Element | null {
  useUpdate(subscribeOnUpdates)

  const sourceState = props.nodeStates.find(props.linkState.sourceId.value)
  const targetState = props.nodeStates.find(props.linkState.targetId.value)

  const isCurrentEditing = props.linkStates.editingId.value === props.linkState.id

  if ((!sourceState || !targetState) && !isCurrentEditing) return null

  return (
    <RuleLink
      key={props.linkState.id}
      state={props.linkState}
      targetState={targetState}
      sourceState={sourceState}
      scale={props.scale}
      canvasTranslate={props.canvasTranslate}
      sourceOffset={getOffset(props.linkState.id, sourceState?.ref.value)}
      targetOffset={getOffset(props.linkState.id, targetState?.ref.value)}
      data-id={props.linkState.id}
    />
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    // Запускаем update с timeout для того чтобы обновить сначала Node
    uns.push(props.linkStates.on('editingId', () => setTimeout(update)))
    uns.push(props.linkStates.on('targetId', () => setTimeout(update)))
    uns.push(props.linkStates.on('sourceId', () => setTimeout(update)))
    uns.push(props.linkStates.on('index', () => setTimeout(update)))
  }
}
