import { ItemState, ItemEvents } from '~/abstract/canvas'
import { Point } from '~/entities/point'
import { Prop } from '~/utils/depricated-emitter'

export type Events = ItemEvents & {
  computation: { value: Point['computation'] }
  title: { value: string }
}

export class State extends ItemState<Events> {
  readonly point: Point

  title: Prop<'title', string>

  description: Prop<'description', string | undefined>

  computation: Prop<'computation', 'parallel' | 'successively' | undefined>

  constructor(point: Point) {
    super({ id: point.id, position: point })

    this.point = point

    this.title = new Prop('title', point.name, this)

    this.description = new Prop('description', point.description, this)

    this.computation = new Prop('computation', point.computation, this)
  }
}
