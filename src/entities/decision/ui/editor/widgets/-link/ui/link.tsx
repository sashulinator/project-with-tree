import './link.css'

import { clsx } from 'clsx'

import { Link as UILink } from '~/ui/canvas'
import { Position } from '~/utils/core'
import { fns } from '~/utils/function'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'
import { StateDictionary as NodeStateDictionary } from '../../-node'
import { State } from '../models/state'
import { StateDictionary as LinkStateDictionary } from '../../-link'
import { getOffset } from '../lib/-get-offset'

export interface LinkProps extends React.HTMLAttributes<SVGPathElement> {
  scale: number
  canvasTranslate: Position
  state: State
  nodeStates: NodeStateDictionary
  linkStates: LinkStateDictionary
}

export function Link(props: LinkProps): JSX.Element | null {
  const { scale, state, canvasTranslate, linkStates, nodeStates, ...pathProps } = props

  const sourceState = nodeStates.find(props.state.sourceId.value)
  const targetState = nodeStates.find(props.state.targetId.value)

  useUpdate(subscribeOnUpdates, [sourceState, targetState])
  useOnMount(useForceUpdate())

  const isCurrentEditing = linkStates.editingId.value === props.state.id

  if ((!sourceState || !targetState) && !isCurrentEditing) return null

  return (
    <UILink
      {...pathProps}
      className={clsx(pathProps.className, 'rule-Link')}
      scale={scale}
      sourceOffset={getOffset(props.state.id, sourceState?.ref.value)}
      targetOffset={getOffset(props.state.id, targetState?.ref.value)}
      canvasTranslate={canvasTranslate}
      sourcePosition={sourceState?.position.value}
      targetPosition={targetState?.position.value}
      onClick={fns(pathProps.onClick, removeLink)}
    />
  )

  // Private

  function removeLink(): void {
    state.targetId.value = undefined
  }

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    // Запускаем update с timeout для того чтобы обновить сначала Node
    uns.push(linkStates.on('editingId', () => setTimeout(update)))
    uns.push(linkStates.on('targetId', () => setTimeout(update)))
    uns.push(linkStates.on('sourceId', () => setTimeout(update)))
    uns.push(linkStates.on('index', () => setTimeout(update)))
    if (targetState) {
      uns.push(targetState?.on('position', update))
    }
    if (sourceState) {
      uns.push(sourceState?.on('position', update))
      uns.push(sourceState?.on('ref', update))
    }
  }
}

Link.displayName = 'RuleLink'
