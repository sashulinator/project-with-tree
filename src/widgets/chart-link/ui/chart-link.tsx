import './chart-link.css'

import { CanvasState } from '~/entities/decision'
import { PointState } from '~/entities/point/state'
import { Id, assertDefined } from '~/utils/core'
import { getOffsetInElement } from '~/utils/dom'
import { emptyFn } from '~/utils/function/empty-fn'
import { useForceUpdate, useOnMount, useUpdate } from '~/utils/hooks'
import { Position } from '~/widgets/canvas'
import Link from '~/widgets/canvas/ui/link/ui/depricated-link'

export interface ChartLinkProps {
  decisionState: CanvasState
  targetState?: PointState | undefined
  sourceState?: PointState | undefined
  id?: Id | undefined
}

export default function ChartLink(props: ChartLinkProps): JSX.Element | null {
  const update = useForceUpdate()

  useOnMount(update)
  useUpdate(subscribeOnUpdates)

  return (
    <Link
      canvasTranslate={props.decisionState.translate.value}
      scale={props.decisionState.scale.value}
      sourcePosition={sourcePosition()}
      targetPosition={targetPosition()}
      onClick={
        props.sourceState && props.targetState
          ? (): void => props.sourceState?.ruleList.removeLink(props.id || '')
          : emptyFn
      }
    />
  )

  // Private

  function sourcePosition(): Position | null {
    if (props.sourceState === undefined) return null

    assertDefined(props.id)
    const srcLinkEl = props.sourceState?.ref.value?.querySelector(`[data-id="${props.id.toString()}"]`) as HTMLElement
    const srcLinkOffset = getOffsetInElement(srcLinkEl, props.sourceState?.ref.value)
    const srcLinkRect = srcLinkEl?.getBoundingClientRect() || { height: 0 }
    return {
      x: props.sourceState.position.value.x + props.sourceState.width.value,
      y:
        props.sourceState.position.value.y +
        srcLinkOffset.top / props.decisionState.scale.value +
        srcLinkRect.height / 2 / props.decisionState.scale.value,
    }
  }

  function targetPosition(): Position | null {
    if (props.targetState === undefined) return null

    return {
      x: props.targetState.position.value.x,
      y: props.targetState.position.value.y + props.targetState.height.value / 2,
    }
  }

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
