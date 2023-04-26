import { createElement, useEffect, useRef } from 'react'

import { EventNames, State } from '~/packages/chart'
import { Id } from '~/utils/core'
import { useForceUpdate } from '~/utils/hooks'

import { useZoom } from '../lib/use-zoom'

interface TreeChartProps<D extends { id: Id; children?: Id[] }> {
  data: Record<Id, D>
  state: State
  renderNode: (props: { item: D }) => JSX.Element
}

export default function TreeChart<D extends { id: Id; children?: Id[] }>(props: TreeChartProps<D>): JSX.Element {
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
        {Object.values(props.data).map((item) => {
          return createElement(props.renderNode, { key: item.id, item })
        })}
      </g>
    </svg>
  )

  // Private

  function getTransform(): string {
    return `translate(${props.state.translate.x}px, ${props.state.translate.y}px) scale(${props.state.scale})`
  }
}
