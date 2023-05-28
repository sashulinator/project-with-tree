import { ForwardedRef, forwardRef, useEffect } from 'react'

import { PointState } from '~/entities/point/state'
import { useForceUpdate } from '~/utils/hooks'

export interface ItemProps extends React.HTMLAttributes<SVGGElement> {
  children: React.ReactNode
  state: PointState
}

/**
 * Основываясь на state отрисовывает Item в нужном месте
 */
function ItemComponent(props: ItemProps, ref: ForwardedRef<SVGGElement>): JSX.Element {
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
    const x = props.state.position.value.x - props.state.width.value / 2
    const y = props.state.position.value.y - props.state.height.value / 2
    return `translate(${x}px, ${y}px)`
  }

  function subscribeOnUpdates(): void {
    state.emitter.on('setPosition', update)
    state.emitter.on('setWidth', update)
    state.emitter.on('setHeight', update)
  }
}

const ChartItem = forwardRef(ItemComponent)
ChartItem.displayName = 'ChartItem'
export default ChartItem
