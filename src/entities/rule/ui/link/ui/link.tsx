import { EditorState } from '~/entities/decision'
import { PointState } from '~/entities/point/ui/node/state'
import { Link as UILink } from '~/ui/canvas'
import { Offset } from '~/utils/core'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'

export interface ChartLinkProps extends React.HTMLAttributes<SVGPathElement> {
  decisionState: EditorState
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
