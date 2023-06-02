import { Emitter } from '~/lib/emitter'
import { Emitterable, EmitterableProp as Prop } from '~/utils/emitter'
import { Position, PositionProp } from '~/widgets/canvas'

import { BoardEvents } from './events'

export interface BoardStateProps {
  translate: Position
  scale: number
}

export class BoardState<E extends BoardEvents> implements Emitterable<Emitter<E>> {
  emitter: Emitter<E>

  translate: PositionProp<'setTranslate'>

  scale: Prop<'setScale', number>

  constructor(props: BoardStateProps) {
    this.emitter = new Emitter<E>()

    this.translate = new PositionProp('setTranslate', props.translate, this)

    this.scale = new Prop('setScale', props.scale, this)
  }
}
