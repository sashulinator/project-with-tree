import { ForwardedRef, forwardRef, useEffect, useRef } from 'react'

import { Any } from '~/utils/core'
import { useForceUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'
import { State as ChartState, EventNames } from '~/widgets/chart'

export interface ChartProps extends React.SVGAttributes<SVGSVGElement> {
  state: ChartState<Any, Any>
  children: React.ReactNode
}

function ChartComponent(props: ChartProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  const { state: state, children, ...svgProps } = props
  const svgRef = useRef<null | SVGSVGElement>(null)

  const update = useForceUpdate()

  useEffect(() => {
    state.emitter.on(EventNames.setScale, update)
    state.emitter.on(EventNames.setTranslate, update)
  }, [])

  return (
    <svg width='100%' height='100%' {...svgProps} ref={setRefs(svgRef, ref)}>
      <g style={{ transform: getTransform() }}>{children}</g>
    </svg>
  )

  // Private

  function getTransform(): string {
    const { translate, scale } = state
    return `translate(${translate.value.x}px, ${translate.value.y}px) scale(${scale})`
  }
}

const Chart = forwardRef<SVGSVGElement, ChartProps>(ChartComponent)
Chart.displayName = 'Chart'
export default Chart
