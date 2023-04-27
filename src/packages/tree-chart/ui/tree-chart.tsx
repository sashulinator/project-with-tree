import { createElement, useEffect, useRef } from 'react'

import { EventNames, State } from '~/packages/chart'
import { Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'
import { useForceUpdate } from '~/utils/hooks'

import { useZoom } from '../lib/use-zoom'

interface TreeChartProps<D extends { id: Id }, P> {
  data: Dictionary<D>
  state: State
  nodeProps: P
  renderNode: (props: { node: D; data: Dictionary<D> } & P) => JSX.Element
}

export default function TreeChart<D extends { id: Id }, P>(props: TreeChartProps<D, P>): JSX.Element {
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
        {Object.values(props.data).map((node) => {
          return createElement(props.renderNode, { key: node.id, node, data: props.data, ...props.nodeProps })
        })}
      </g>
    </svg>
  )

  // Private

  function getTransform(): string {
    return `translate(${props.state.translate.x}px, ${props.state.translate.y}px) scale(${props.state.scale})`
  }
}
