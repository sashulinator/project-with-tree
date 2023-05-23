import { ForwardedRef, forwardRef, useEffect } from 'react'

import { useForceUpdate } from '~/utils/hooks'
import { EventNames } from '~/widgets/chart-item'

import { ChartItemProps } from '../types/chart-item-props'

/**
 * Основываясь на state отрисовывает Item в нужном месте
 */
function ChartItemComponent(props: ChartItemProps, ref: ForwardedRef<SVGGElement>): JSX.Element {
  const { state, ...gProps } = props

  const update = useForceUpdate()
  useEffect(subscribeOnUpdates)

  return (
    <g
      {...gProps}
      ref={ref}
      style={{
        transform: getTransform(),
        ...gProps.style,
      }}
    >
      {props.children}
    </g>
  )

  // Private

  function getTransform(): string {
    const x = props.state.position.x - props.state.width / 2
    const y = props.state.position.y - props.state.height / 2
    return `translate(${x}px, ${y}px)`
  }

  function subscribeOnUpdates(): void {
    state.emitter.on('setPosition', update)
    state.emitter.on('setWidth', update)
    state.emitter.on('setHeight', update)
  }
}

const ChartItem = forwardRef(ChartItemComponent)
ChartItem.displayName = 'ChartItem'
export default ChartItem
