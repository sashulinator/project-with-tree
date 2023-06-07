import { CanvasState } from '~/entities/decision'
import { PointState } from '~/entities/point/state'
import { Link as UILink } from '~/ui/canvas'
import { Offset } from '~/utils/core'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'

export interface ChartLinkProps extends React.HTMLAttributes<SVGPathElement> {
  decisionState: CanvasState
  targetState?: PointState | undefined
  sourceState?: PointState | undefined
  targetOffset: Offset | null
  sourceOffset: Offset | null
}

export function Link(props: ChartLinkProps): JSX.Element | null {
  const { decisionState, targetState, sourceState, ...pathProps } = props

  useOnMount(useForceUpdate())
  useUpdate(subscribeOnUpdates)

  return (
    <UILink
      scale={decisionState.scale.value}
      canvasTranslate={decisionState.translate.value}
      sourcePosition={sourceState?.position.value}
      targetPosition={targetState?.position.value}
      {...pathProps}
    />
  )

  // Private

  function subscribeOnUpdates(update: () => void): void {
    props.targetState?.emitter.on('setPosition', update)
    props.sourceState?.emitter.on('setPosition', update)
    props.targetState?.emitter.on('setHeight', update)
    props.sourceState?.emitter.on('setHeight', update)
    props.targetState?.emitter.on('setWidth', update)
    props.sourceState?.emitter.on('setWidth', update)
    props.sourceState?.emitter.on('setRef', update)
  }
}

Link.displayName = 'PointLink'
