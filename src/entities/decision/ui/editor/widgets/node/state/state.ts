import uniqid from 'uniqid'

import { ItemEvents, ItemState } from '~/abstract/canvas'
import { Point } from '~/entities/point'
import { Prop } from '~/utils/depricated-emitter'

export type Events = ItemEvents & {
  computation: { value: Point['computation'] }
  title: { value: string }
}

export type StateProps = Point

export class State extends ItemState<Events> {
  readonly point: Point

  title: Prop<'title', string>

  description: Prop<'description', string | undefined>

  computation: Prop<'computation', 'parallel' | 'successively' | undefined>

  constructor(point: StateProps) {
    super({ id: point.id, position: { x: point.x, y: point.y } })

    this.point = point

    this.title = new Prop('title', point.name, this)

    this.description = new Prop('description', point.description, this)

    this.computation = new Prop('computation', point.computation, this)
  }

  copy = (point?: StateProps): State => {
    return new State({ ...this.serialize(), ...point, id: uniqid() })
  }

  serialize = (): Point => {
    return {
      ...this.point,
      name: this.title.value,
      description: this.description.value || '',
      computation: this.computation.value || 'parallel',
    }
  }
}
