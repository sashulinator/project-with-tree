import { ItemEvents, ItemState } from '~/abstract/canvas'
import { Point } from '~/entities/decision'
import { Any, Dictionary, assertNotNull, generateId } from '~/utils/core'
import { getElementSize } from '~/utils/dom'
import { Size } from '~/utils/dom/types/size'
import { Prop } from '~/utils/emitter'

export type Events = ItemEvents & {
  computation: { value: Point['computation'] }
  title: { value: string }
}

export class Controller extends ItemState<Events> {
  readonly point: Point

  title: Prop<'title', string>

  computation: Prop<'computation', 'parallel' | 'successively' | undefined>

  props: Prop<'props', Dictionary<Any>>

  constructor(point: Point) {
    super({ id: point.id, position: { x: point.xy[0], y: point.xy[1] } })

    this.point = point

    // TODO убрать ВХОД после демо
    this.title = new Prop('title', point.name || 'ВХОД', this)

    this.computation = new Prop('computation', point.computation, this)

    this.props = new Prop('props', point.props || {}, this)
  }

  copy = (point?: Point): Controller => {
    return new Controller({ ...this.serialize(), ...point, id: generateId() })
  }

  get size(): Size {
    assertNotNull(this.ref.value)
    return getElementSize(this.ref.value)
  }

  serialize = (): Point => {
    return {
      ...this.point,
      name: this.title.value,
      computation: this.computation.value || 'parallel',
    }
  }

  deserialize(): Point {
    const res = {
      ...this.point,
      name: this.title.value,

      xy: [this.position.value.x, this.position.value.y],
      // computation: this.computation.value || 'parallel',
      props: this.props.value,
    }

    if (this.computation.value) {
      res['computation'] = this.computation.value
    }

    return res as Point
  }
}
