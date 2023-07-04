import './link.css'

import { clsx } from 'clsx'

import { NodeState } from '~/entities/point'
import { Link } from '~/ui/canvas'
import { Offset, Position } from '~/utils/core'
import { fns } from '~/utils/function'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'

import { State } from '../models/state'

export interface Props extends React.HTMLAttributes<SVGPathElement> {
  scale: number
  canvasTranslate: Position
  targetState?: NodeState | undefined
  sourceState?: NodeState | undefined
  targetOffset: Offset | null
  sourceOffset: Offset | null
  state: State
}

export function Component(props: Props): JSX.Element | null {
  const { scale, state, canvasTranslate, targetState, sourceState, ...pathProps } = props

  useOnMount(useForceUpdate())
  useUpdate(subscribeOnUpdates, [targetState, sourceState])

  return (
    <Link
      {...pathProps}
      className={clsx(pathProps.className, 'rule-Link')}
      scale={scale}
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

  function subscribeOnUpdates(update: () => void): void {
    targetState?.on('setPosition', update)
    sourceState?.on('setPosition', update)
    targetState?.on('setHeight', update)
    sourceState?.on('setHeight', update)
    targetState?.on('setWidth', update)
    sourceState?.on('setWidth', update)
    sourceState?.on('ref', update)
  }
}

Component.displayName = 'RuleLink'
