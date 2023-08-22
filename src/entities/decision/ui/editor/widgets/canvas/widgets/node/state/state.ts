import uniqid from 'uniqid'

import { ItemEvents, ItemState } from '~/abstract/canvas'
import { Point } from '~/entities/point'
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
    // TODO убрать после демо `|| { x: 0, y: 0 }`
    super({ id: point.id, position: point.position || { x: 0, y: 0 } })

    this.point = point

    this.title = new Prop('title', point.name || '_____UNDEFINED_____', this)

    this.computation = new Prop('computation', point.computation, this)
  }

  copy = (point?: StateProps): State => {
    return new State({ ...this.serialize(), ...point, id: uniqid() })
  }

  serialize = (): Point => {
    return {
      ...this.point,
      name: this.title.value,
      computation: this.computation.value || 'parallel',
    }
  }
}
