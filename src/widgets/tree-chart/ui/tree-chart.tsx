import { useEffect, useRef } from 'react'

import { useForceUpdate } from '~/utils/hooks'
import { EventNames, State } from '~/widgets/chart'

import { useZoom } from '../lib/use-zoom'

interface TreeChartProps {
  state: State
}

export default function TreeChart(props: TreeChartProps): JSX.Element {
  const svgRef = useRef<null | SVGSVGElement>(null)

  const update = useForceUpdate()

  useZoom(svgRef, props.state)
  useEffect(() => {
    props.state.mitt.on(EventNames.setScale, update)
    props.state.mitt.on(EventNames.setTranslate, update)
  }, [])

  return (
    <svg ref={svgRef} width='100%' height='100%'>
      <g style={{ transform: getTransform() }}>
        <circle cx='50' cy='50' r='50' />
      </g>
    </svg>
  )

  // Private

  function getTransform(): string {
    return `translate(${props.state.translate.x}px, ${props.state.translate.y}px) scale(${props.state.scale})`
  }
}
