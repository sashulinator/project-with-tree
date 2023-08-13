import { PositionProp } from '~/lib/emitter'
import { Id, Position } from '~/utils/core'
import { Emitter, Prop } from '~/utils/emitter'

export type Events = {
  position: { value: Position }
  ref: { value: HTMLElement }
}

export interface StateProps {
  id: Id
  position: Position
}

export class State<E extends Events> extends Emitter<E> {
  id: Id

  ref: Prop<'ref', null | Element>

  position: PositionProp<'position'>

  constructor(props: StateProps) {
    super()

    this.id = props.id

    this.ref = new Prop<'ref', null | Element>('ref', null, this)

    this.position = new PositionProp('position', props.position, this)
  }
}
