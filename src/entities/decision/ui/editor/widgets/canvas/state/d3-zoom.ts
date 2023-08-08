import { ZoomBehavior, ZoomTransform, zoom, zoomIdentity } from 'd3-zoom'
import { PositionProp } from '~/lib/emitter'

import { Position } from '~/utils/core'
import { AnyEvent, Emitter, Prop } from '~/utils/depricated-emitter'

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
      this._emitter.translate.value = { x: transform.x, y: transform.y }
      this._emitter.scale.value = transform.k
    }

    this._emitter = emitter

    this.zoomIdentity = zoomIdentity
      .translate(emitter.translate.value.x, emitter.translate.value.y)
      .scale(emitter.scale.value)

    this.zoomBehavior = zoom<SVGSVGElement, unknown>()
      .on('zoom', _zoom)
      .filter((ev: WheelEvent | MouseEvent) => {
        if (ev.type === 'wheel') {
          return true
        }
        return ev.target === emitter.ref.value
      })

    emitter.d3selection.emitters.push((selection) => {
      if (!selection) return
      selection?.call(
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.zoomBehavior.transform,
        this.zoomIdentity
      )
      selection?.call(this.zoomBehavior, this.zoomIdentity)
    })
  }

  setScale = (scale: number): void => {
    this._emitter.d3selection.value?.transition().duration(2500).call(
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.zoomBehavior.transform,
      this.zoomIdentity.scale(scale)
    )
  }

  setTranslate = (translate: Position): void => {
    this._emitter.d3selection.value?.transition().duration(500).call(
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.zoomBehavior.transform,
      this.zoomIdentity.translate(translate.x, translate.y)
    )
  }
}
