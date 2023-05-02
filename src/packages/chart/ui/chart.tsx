import { ForwardedRef, forwardRef, useEffect, useRef } from 'react'

import { State as ChartState, EventNames } from '~/packages/chart'
import { useForceUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

export interface ChartProps extends React.SVGAttributes<SVGSVGElement> {
  chartState: ChartState<unknown, unknown>
  children: React.ReactNode
}

function ChartComponent(props: ChartProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  const { chartState: state, children, ...svgProps } = props
  const svgRef = useRef<null | SVGSVGElement>(null)

  const update = useForceUpdate()

  useEffect(() => {
    state.mitt.on(EventNames.setScale, update)
    state.mitt.on(EventNames.setTranslate, update)
  }, [])

  return (
    <svg width='100%' height='100%' {...svgProps} ref={setRefs(svgRef, ref)}>
      <g style={{ transform: getTransform() }}>{children}</g>
    </svg>
  )

  // Private

  function getTransform(): string {
    const { translate, scale } = state
    return `translate(${translate.x}px, ${translate.y}px) scale(${scale})`
  }
}

const Chart = forwardRef<SVGSVGElement, ChartProps>(ChartComponent)
Chart.displayName = 'Chart'
export default Chart
