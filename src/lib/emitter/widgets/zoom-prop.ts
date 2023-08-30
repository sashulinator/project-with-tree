import { select } from 'd3-selection'
import { ZoomBehavior, ZoomTransform, zoom, zoomIdentity } from 'd3-zoom'

import { Any, Position, assertNotNull } from '~/utils/core'
import { Emitter, Prop } from '~/utils/emitter'

export type Zoom = { x: number; y: number; k: number }

export type Config = {
  scaleExtent?: [number, number]
  filter?: (event: WheelEvent | MouseEvent) => boolean
  onChange?: (value: Zoom) => void
}

export class ZoomProp<E extends string> extends Prop<E, Zoom, Emitter<Record<E, { value: Zoom }>>> {
  private _zoomBehavior: ZoomBehavior<Element, unknown>

  private _zoomIdentity: ZoomTransform

  private _ref: null | Element

  constructor(eventName: E, value: Zoom, emitter: Emitter<Any>, config: Config) {
    super(eventName, value, emitter as Emitter<Record<E, { value: Zoom }>>)

    this._ref = null

    const _zoom = ({ transform }: { transform: ZoomTransform }): void => {
      this.value = transform
      config.onChange?.(transform)
    }

    this._zoomIdentity = zoomIdentity

    this._zoomBehavior = zoom<Element, unknown>().on('zoom', _zoom)

    if (config.scaleExtent) this._zoomBehavior.scaleExtent(config.scaleExtent)
    if (config.filter) this._zoomBehavior.filter(config.filter)
  }

  setRef = (instance: null | Element): void => {
    if (instance === null) return

    const isNew = this._ref !== instance

    this._ref = instance

    if (!isNew || this._ref === null) return

    select(this._ref)
      // Вешаем прослушивание событий
      .call(this._zoomBehavior, this._zoomIdentity)

    // Инициируем translate и scale
    this.setZoom(this.value, this.value.k, { duration: 0 })
  }

  setZoom = (translate: Position, scale = 1, config?: { duration?: number }): void => {
    assertNotNull(this._ref)
    select(this._ref)
      .transition()
      .duration(config?.duration ?? 500)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      .call(this._zoomBehavior.transform, this._zoomIdentity.translate(translate.x, translate.y).scale(scale))
  }
}
