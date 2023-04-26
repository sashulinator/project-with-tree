/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import { select as d3select, zoom as d3zoom, zoomIdentity } from 'd3'
import { RefObject } from 'react'

import { Any, SetterOrUpdater, isNull } from '~/utils/core'

import { ScaleState, TranslateState } from '../../../types/state'

export function zoom(
  svgRef: RefObject<SVGSVGElement>,
  translate: TranslateState,
  scale: ScaleState,
  setTranslate: SetterOrUpdater<TranslateState>,
  setScale: SetterOrUpdater<ScaleState>
): void {
  if (isNull(svgRef.current)) return

  const svg = d3select<SVGElement, unknown>(svgRef.current)

  // Sets initial offset, so that first pan and zoom does not jump back to default [0,0] coords.
  svg.call(d3zoom<SVGElement, unknown>().transform, zoomIdentity.translate(translate.x, translate.y).scale(scale))

  svg.call(
    d3zoom<SVGElement, unknown>()
      .scaleExtent([0.1, 1])
      .on('zoom', (event: Any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        if (['mousemove', 'touchmove', 'dblclick'].includes(event?.sourceEvent?.type)) {
          return
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        setTranslate({ x: event.transform.x, y: event.transform.y })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        setScale(event.transform.k)
      })
  )
}
