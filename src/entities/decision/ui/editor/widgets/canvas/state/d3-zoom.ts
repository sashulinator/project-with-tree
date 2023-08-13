import { ZoomBehavior, ZoomTransform, zoom, zoomIdentity } from 'd3-zoom'

import { PositionProp } from '~/lib/emitter'
import { Position } from '~/utils/core'
import { AnyEvent, Emitter, Prop } from '~/utils/depricated-emitter'
import { isMetaCtrlKey } from '~/utils/dom-event'

import { getLocalStorageZoom, setZoomLocalStorage } from '../lib/local-storage-zoom'
import { D3Selection } from './d3-selection'

interface IEmitter<E extends AnyEvent> extends Emitter<E> {
  ref: Prop<string, SVGSVGElement | null>
  scale: Prop<string, number>
  translate: PositionProp<string>
  d3selection: D3Selection<E>
}

export class D3Zoom<E extends AnyEvent> {
  private _emitter: IEmitter<E>

  zoomBehavior: ZoomBehavior<SVGSVGElement, unknown>

  zoomIdentity: ZoomTransform

  constructor(emitter: IEmitter<E>) {
    const _zoom = ({ transform }: { transform: ZoomTransform }): void => {
      const k = Number(transform.k.toFixed(4))
      const x = Number(transform.x.toFixed(4))
      const y = Number(transform.y.toFixed(4))
      this._emitter.translate.value = { x, y }
      this._emitter.scale.value = k
      setZoomLocalStorage({ x, y, k })
    }

    this._emitter = emitter

    this.zoomIdentity = zoomIdentity

    this.zoomBehavior = zoom<SVGSVGElement, unknown>()
      .on('zoom', _zoom)
      .scaleExtent([0.2, 1])
      .filter((event: WheelEvent | MouseEvent) => {
        if (isMetaCtrlKey(event)) {
          return false
        }
        if (event.type === 'wheel') {
          return true
        }
        return event.target === emitter.ref.value
      })

    emitter.d3selection.emitters.push((selection) => {
      if (!selection) return
      const localStorageZoom = getLocalStorageZoom()

      if (localStorageZoom) {
        this.setZoom(localStorageZoom, localStorageZoom.k)
      }

      selection?.call(this.zoomBehavior, this.zoomIdentity)
    })
  }

  setZoom = (translate: Position, scale = 1): void => {
    this._emitter.d3selection.value?.transition().duration(500).call(
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.zoomBehavior.transform,
      this.zoomIdentity.translate(translate.x, translate.y).scale(scale)
    )
  }
}
