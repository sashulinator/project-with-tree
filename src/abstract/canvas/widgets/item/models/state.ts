import { PositionProp } from '~/lib/emitter'
import { Emitter } from '~/lib/emitter/emitter'
import { Id, Position } from '~/utils/core'
import { Prop } from '~/utils/emitter'

export type ItemEvents = {
  position: { value: Position }
  ref: { value: HTMLElement }
}

export interface ItemStateProps {
  id: Id
  position: Position
}

export class ItemState<E extends ItemEvents> extends Emitter<E> {
  id: Id

  ref: Prop<'ref', null | Element>

  position: PositionProp<'position'>

  constructor(props: ItemStateProps) {
    super()

    this.id = props.id

    this.ref = new Prop<'ref', null | Element>('ref', null, this)

    this.position = new PositionProp('position', props.position, this)
  }
}
