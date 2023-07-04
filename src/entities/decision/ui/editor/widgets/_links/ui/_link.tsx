import { NodeState } from '~/entities/point'
import { RuleLink, RuleLinkState } from '~/entities/rule'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { Any, Position } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { getOffset } from '../lib/_get-offset'
import { LinkStateDictionary } from '../state/state'

interface MapLinkProp {
  scale: number
  canvasTranslate: Position
  targetState?: NodeState | undefined
  sourceState?: NodeState | undefined
  nodeStates: EmitterableDictionary<Any, NodeState>
  linkState: RuleLinkState
  linkStates: LinkStateDictionary
}

export function Link(props: MapLinkProp): JSX.Element | null {
  useUpdate(subscribeOnUpdates)

  const sourceState = props.nodeStates.find(props.linkState.rule.value.sourceId)
  const targetState = props.nodeStates.find(props.linkState.rule.value.targetId)

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
    uns.push(props.linkStates.on('rule', () => setTimeout(update)))
  }
}
