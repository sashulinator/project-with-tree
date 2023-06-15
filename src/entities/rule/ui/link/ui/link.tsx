import { NodeState } from '~/entities/point/ui/node/state'
import { Link as UILink } from '~/ui/canvas'
import { Offset, Position } from '~/utils/core'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'

export interface LinkProps extends React.HTMLAttributes<SVGPathElement> {
  scale: number
  canvasTranslate: Position
  targetState?: NodeState | undefined
  sourceState?: NodeState | undefined
  targetOffset: Offset | null
  sourceOffset: Offset | null
}

export function Link(props: LinkProps): JSX.Element | null {
  const { scale, canvasTranslate, targetState, sourceState, ...pathProps } = props

  useOnMount(useForceUpdate())
  useUpdate(subscribeOnUpdates, [targetState, sourceState])

  return (
    <UILink
      scale={scale}
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
