/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import { select as d3select, zoom as d3zoom, zoomIdentity } from 'd3'
import { RefObject, useLayoutEffect } from 'react'

import { State } from '~/packages/chart'
import { Any, isNull } from '~/utils/core'

export function useZoom(svgRef: RefObject<SVGSVGElement>, state: State<unknown, unknown>): void {
  useLayoutEffect(() => {
    if (isNull(svgRef.current)) return

    const svg = d3select<SVGElement, unknown>(svgRef.current)

    // Sets initial offset, so that first pan and zoom does not jump back to default [0,0] coords.
    svg.call(
      d3zoom<SVGElement, unknown>().transform,
      zoomIdentity.translate(state.translate.x, state.translate.y).scale(state.scale)
    )

    svg.call(
      d3zoom<SVGElement, unknown>()
        .scaleExtent([0.1, 1])
        .on('zoom', (event: Any) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          if (['mousemove', 'touchmove', 'dblclick'].includes(event?.sourceEvent?.type)) {
            return
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          state.setTranslate(event.transform)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
          state.setScale(event.transform.k)
        })
    )
  }, [])
}
