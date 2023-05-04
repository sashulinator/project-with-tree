import { ForwardedRef, forwardRef, useEffect } from 'react'

import { useForceUpdate } from '~/utils/hooks'
import { EventNames } from '~/widgets/chart-item'

import { ChartItemProps } from '../types/chart-item-props'

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
    return `translate(${props.state.position.x}px, ${props.state.position.y}px)`
  }

  function subscribeOnUpdates(): void {
    state.mitt.on(EventNames.setPosition, update)
  }
}

const ChartItem = forwardRef(ChartItemComponent)
ChartItem.displayName = 'ChartItem'
export default ChartItem
