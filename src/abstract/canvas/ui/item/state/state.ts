import { Emitter } from '~/lib/emitter/emitter'
import { Id } from '~/utils/core'
import { Emitterable, EmitterableProp } from '~/utils/emitter'

import { PositionProp } from '../../../state/position-prop'
import { Position } from '../../../types/position'
import { ItemEvents } from './events'

export interface ItemStateProps {
  id: Id
  position: Position
}

export class ItemState<E extends ItemEvents> implements Emitterable<Emitter<E>> {
  emitter: Emitter<E>

  id: Id

  ref: EmitterableProp<'setRef', null | HTMLElement>

  position: PositionProp<'setPosition'>

  constructor(props: ItemStateProps) {
    this.emitter = new Emitter<E>()

    this.id = props.id

    this.ref = new EmitterableProp<'setRef', null | HTMLElement>('setRef', null, this)

    this.position = new PositionProp('setPosition', props.position, this)
  }
}
