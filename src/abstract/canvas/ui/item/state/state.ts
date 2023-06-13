import { Emitter } from '~/lib/emitter/emitter'
import { Id } from '~/utils/core'
import { Prop } from '~/utils/emitter'

import { PositionProp } from '../../../state/position-prop'
import { Position } from '../../../types/position'
import { ItemEvents } from './events'

export interface ItemStateProps {
  id: Id
  position: Position
}

export class ItemState<E extends ItemEvents> extends Emitter<E> {
  id: Id

  ref: Prop<'ref', null | HTMLElement>

  position: PositionProp<'setPosition'>

  constructor(props: ItemStateProps) {
    super()

    this.id = props.id

    this.ref = new Prop<'ref', null | HTMLElement>('ref', null, this)

    this.position = new PositionProp('setPosition', props.position, this)
  }
}
