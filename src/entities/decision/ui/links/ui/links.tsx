import { memo } from 'react'

import { NodeState } from '~/entities/point'
import { Link, LinkState } from '~/entities/rule'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { Any, Position } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { getOffset } from '../get-offset'
import { LinkStateDictionary } from '../state/state'

interface LinksProps {
  scale: number
  canvasTranslate: Position
  linkStates: LinkStateDictionary
  nodeStates: EmitterableDictionary<Any, NodeState>
}

function LinksComponent(props: LinksProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.linkStates.values().map((linkState) => {
        return (
          <MapLink
            key={linkState.id}
            scale={props.scale}
            canvasTranslate={props.canvasTranslate}
            nodeStates={props.nodeStates}
            linkState={linkState}
            linkStates={props.linkStates}
          />
        )
      })}
    </>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.linkStates.on('add', () => setTimeout(update)))
    uns.push(props.linkStates.on('remove', update))
    uns.push(props.linkStates.on('update', update))
  }
}

export const Links = memo(LinksComponent)

// Private

interface MapLinkProp {
  scale: number
  canvasTranslate: Position
  targetState?: NodeState | undefined
  sourceState?: NodeState | undefined
  nodeStates: EmitterableDictionary<Any, NodeState>
  linkState: LinkState
  linkStates: LinkStateDictionary
}

function MapLink(props: MapLinkProp): JSX.Element | null {
  useUpdate(subscribeOnUpdates)

  const sourceState = props.nodeStates.find(props.linkState.rule.value.sourceId)
  const targetState = props.nodeStates.find(props.linkState.rule.value.targetId)

  return (
    <Link
      data-id={props.linkState.id}
      key={props.linkState.id}
      targetState={targetState}
      sourceState={sourceState}
      scale={props.scale}
      canvasTranslate={props.canvasTranslate}
      sourceOffset={getOffset(props.linkState.id, sourceState?.ref.value, props.scale)}
      targetOffset={getOffset(props.linkState.id, targetState?.ref.value, props.scale)}
    />
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    // Запускаем update с timeout для того чтобы обновить сначала Node
    uns.push(props.linkStates.on('editingId', () => setTimeout(update)))
  }
}
