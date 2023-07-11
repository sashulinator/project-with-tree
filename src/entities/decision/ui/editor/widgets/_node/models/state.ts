import { ItemEvents } from '~/abstract/canvas/widgets/item'
import { ItemState } from '~/abstract/canvas'
import { Point } from '~/entities/point'
import { Prop } from '~/utils/emitter'

export type Events = ItemEvents & {
  computation: { value: Point['computation'] }
  title: { value: string }
}

export interface StateProps {
  point: Point
}

export class State extends ItemState<Events> {
  readonly point: Point

  title: Prop<'title', string>

  description: Prop<'description', string | undefined>

  computation: Prop<'computation', 'parallel' | 'successively' | undefined>

  constructor(props: StateProps) {
    super({ id: props.point.id, position: props.point })

    this.point = props.point

    this.title = new Prop('title', props.point.name, this)

    this.description = new Prop('description', props.point.description, this)

    this.computation = new Prop('computation', props.point.computation, this)
  }
}
