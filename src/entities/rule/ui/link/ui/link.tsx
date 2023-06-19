import './link.css'

import clsx from 'clsx'

import { LinkStateDictionary } from '~/entities/decision/ui/links/state/state'
import { NodeState } from '~/entities/point/ui/node/state'
import { Link as UILink } from '~/ui/canvas'
import { Offset, Position } from '~/utils/core'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'

import { LinkState } from '../state'

export interface LinkProps extends React.HTMLAttributes<SVGPathElement> {
  scale: number
  canvasTranslate: Position
  targetState?: NodeState | undefined
  sourceState?: NodeState | undefined
  targetOffset: Offset | null
  sourceOffset: Offset | null
  linkStates: LinkStateDictionary
  state: LinkState
}

export function Link(props: LinkProps): JSX.Element | null {
  const { scale, canvasTranslate, linkStates, targetState, sourceState, ...pathProps } = props

  useOnMount(useForceUpdate())
  useUpdate(subscribeOnUpdates, [targetState, sourceState])

  return (
    <UILink
      onClick={(): void => {
        linkStates.remove(props.state.id)
      }}
      scale={scale}
      className={clsx('rule-Link')}
      canvasTranslate={canvasTranslate}
      sourcePosition={sourceState?.position.value}
      targetPosition={targetState?.position.value}
      {...pathProps}
    />
  )

  // Private

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

Link.displayName = 'PointLink'
