import { ItemEvents, ItemState } from '~/abstract/canvas'
import { Point } from '~/entities/decision'
import { generateId } from '~/utils/core'
import { Prop } from '~/utils/emitter'

export type Events = ItemEvents & {
  computation: { value: Point['computation'] }
  title: { value: string }
}

export type StateProps = Point

export class State extends ItemState<Events> {
  readonly point: Point

  title: Prop<'title', string>

  computation: Prop<'computation', 'parallel' | 'successively' | undefined>

  constructor(point: StateProps) {
    super({ id: point.id, position: { x: point.xy[0], y: point.xy[1] } })

    this.point = point

    // TODO убрать ВХОД после демо
    this.title = new Prop('title', point.name || 'ВХОД', this)

    this.computation = new Prop('computation', point.computation, this)
  }

  copy = (point?: StateProps): State => {
    return new State({ ...this.serialize(), ...point, id: generateId() })
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
    }

    if (this.computation.value) {
      res['computation'] = this.computation.value
    }

    return res as Point
  }
}
