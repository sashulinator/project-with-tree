import { NodeState } from '~/entities/point/ui/node/state'
import { Link as UILink } from '~/ui/canvas'
import { Offset, Position } from '~/utils/core'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'

export interface ChartLinkProps extends React.HTMLAttributes<SVGPathElement> {
  scale: number
  canvasTranslate: Position
  targetState?: NodeState | undefined
  sourceState?: NodeState | undefined
  targetOffset: Offset | null
  sourceOffset: Offset | null
}

export function Link(props: ChartLinkProps): JSX.Element | null {
  const { scale, canvasTranslate, targetState, sourceState, ...pathProps } = props

  useOnMount(useForceUpdate())
  useUpdate(subscribeOnUpdates)

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
    props.targetState?.on('setPosition', update)
    props.sourceState?.on('setPosition', update)
    props.targetState?.on('setHeight', update)
    props.sourceState?.on('setHeight', update)
    props.targetState?.on('setWidth', update)
    props.sourceState?.on('setWidth', update)
    props.sourceState?.on('ref', update)
  }
}

Link.displayName = 'PointLink'
