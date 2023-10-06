import { ItemEvents, ItemState } from '~/abstract/canvas'
import { Arbitration, DecisionPoint, Point } from '~/entities/decision'
import { Any, Dictionary, assertNotNull, generateId } from '~/utils/core'
import { getElementSize } from '~/utils/dom'
import { Size } from '~/utils/dom/types/size'
import { Prop } from '~/utils/emitter'

export type Events = ItemEvents & {
  computation: { value: DecisionPoint['computation'] | undefined }
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

    this.title = new Prop('title', (point as DecisionPoint).name || '', this)

    this.computation = new Prop(
      'computation',
      (point as DecisionPoint).computation as DecisionPoint['computation'] | undefined,
      this
    )

    this.props = new Prop('props', (point as Arbitration).props || {}, this)
  }

  copy = (point?: Point): Controller => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new Controller({ ...this.serialize(), ...point, id: generateId() } as Any)
  }

  get size(): Size {
    assertNotNull(this.ref.value)
    return getElementSize(this.ref.value)
  }

  serialize = (): Point => {
    const point = {
      ...this.point,
      name: this.title.value,
    }

    if (this.computation.value !== undefined) {
      ;(point as DecisionPoint).computation = this.computation.value
    }

    return point
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
