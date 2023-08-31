import { Zoom, ZoomProp } from '~/lib/emitter'
import { Position, assertNotNull } from '~/utils/core'
import { getElementSize } from '~/utils/dom'
import { isMetaCtrlKey } from '~/utils/dom-event'
import { Size } from '~/utils/dom/types/size'
import { Emitter, Prop } from '~/utils/emitter'

import { getLocalStorageZoom, setZoomLocalStorage } from '../lib/local-storage-zoom'

export type Events = {
  zoom: { value: Zoom }
  ref: { element: SVGSVGElement }
}

export class State extends Emitter<Events> {
  ref: Prop<'ref', null | SVGSVGElement>

  zoom: ZoomProp<'zoom'>

  highlight: Prop<'highlight', (Position & Size) | null>

  constructor() {
    super()

    this.ref = new Prop('ref', null as null | SVGSVGElement, this)

    this.highlight = new Prop('highlight', null as (Position & Size) | null, this)

    // TODO рассчитать середину main ноды
    this.zoom = new ZoomProp('zoom', getLocalStorageZoom() || { x: 500, y: 500, k: 1 }, this, {
      onChange: (value): void => {
        setZoomLocalStorage(value)
      },
      filter: (event): boolean => {
        // На Ctrl мы даем возможность пользователю выделять ноды
        if (isMetaCtrlKey(event)) return false
        if (event.type === 'wheel') return true
        return event.target === this.ref.value
      },
      scaleExtent: [0.1, 1],
    })
  }

  get size(): Size {
    assertNotNull(this.ref.value)
    return getElementSize(this.ref.value)
  }

  /**
   *
   * @param {Point} point тип как в библиотечке dom-align-ts
   * @returns {Position}
   */
  getPointPosition(point: 'cc' | 'bc'): Position {
    const size = this.size
    // center-center
    if (point === 'cc') {
      return {
        x: (-this.zoom.value.x + size.width / 2) / this.zoom.value.k,
        y: (-this.zoom.value.y + size.height / 2) / this.zoom.value.k,
      }
    }

    // bottom-center
    if (point === 'bc') {
      return {
        x: (-this.zoom.value.x + size.width / 2) / this.zoom.value.k,
        y: (-this.zoom.value.y + size.height) / this.zoom.value.k,
      }
    }

    throw Error(`unknown Point`)
  }
}
