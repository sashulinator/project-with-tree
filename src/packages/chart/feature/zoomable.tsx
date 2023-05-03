/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import { select as d3select, zoom as d3zoom, zoomIdentity } from 'd3'
import React, { useLayoutEffect, useRef } from 'react'

import { State } from '~/packages/chart'
import { Any, isNull } from '~/utils/core'

interface ZoomableProps {
  state: State<unknown, Any>
  children: (props: Any) => React.ReactNode
}

export function Zoomable(props: ZoomableProps): JSX.Element {
  const svgRef = useRef<null | SVGSVGElement>(null)

  useLayoutEffect(() => {
    if (isNull(svgRef.current)) return

    const svg = d3select<SVGElement, unknown>(svgRef.current)
    const z = d3zoom<SVGElement, unknown>()

    // Sets initial offset, so that first pan and zoom does not jump back to default [0,0] coords.
    svg.call(
      z.transform,
      zoomIdentity.translate(props.state.translate.x, props.state.translate.y).scale(props.state.scale)
    )

    svg.call(
      z
        .scaleExtent([0.1, 1])
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        .filter((event) => event?.type === 'wheel')
        .on('zoom', (event: Any) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          props.state.setScale(event.transform.k)
        })
    )
  }, [])

  return <>{props.children({ ref: svgRef })}</>
}

Zoomable.displayName = 'Zoomable'
