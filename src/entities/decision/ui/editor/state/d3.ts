import { Selection, select } from 'd3-selection'
import { ZoomBehavior, ZoomTransform, zoom, zoomIdentity } from 'd3-zoom'

import { PositionProp } from '~/abstract/canvas'
import { AnyEvent, Emitter, Prop } from '~/utils/emitter'

interface IEmitter<E extends AnyEvent> extends Emitter<E> {
  ref: Prop<string, SVGSVGElement | null>
  scale: Prop<string, number>
  translate: PositionProp<string>
}

export class D3Prop<E extends AnyEvent> {
  private _emitter: IEmitter<E>

  selection: Selection<SVGSVGElement, unknown, null, undefined> | null

  zoomBehavior: ZoomBehavior<SVGSVGElement, unknown>

  zoomIdentity: ZoomTransform

  constructor(emitter: IEmitter<E>) {
    this._emitter = emitter

    this.selection = null

    this.zoomIdentity = zoomIdentity
      .translate(emitter.translate.value.x, emitter.translate.value.y)
      .scale(emitter.scale.value)

    this.zoomBehavior = zoom<SVGSVGElement, unknown>()
      .on('zoom', this._zoom)
      .filter((ev: WheelEvent | MouseEvent) => {
        if (ev.type === 'wheel') {
          return true
        }
        return ev.target === emitter.ref.value
      })

    this.subscribeOnUpdate()

    emitter.on(emitter.ref.eventName, ({ value }: { value: SVGSVGElement | null }) => {
      if (value === null || this.selection) return
      this.selection = select(value)
      this.selection.call(this.zoomBehavior, this.zoomIdentity)
    })
  }

  private subscribeOnUpdate = (): void => {
    this._emitter.on(this._emitter.scale.eventName, ({ value }: { value: number }) => {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.selection?.call(this.zoomBehavior.transform, this.zoomIdentity.scale(value))
    })
  }

  private _zoom = (): void => {
    console.log('_zoom')
  }
}
