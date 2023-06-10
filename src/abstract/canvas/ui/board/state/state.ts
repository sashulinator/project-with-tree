import { Position, PositionProp } from '~/abstract/canvas'
import { Emitter } from '~/lib/emitter'
import { Any } from '~/utils/core'
import { Emitterable, EmitterableProp, Prop } from '~/utils/emitter'

import { ItemState } from '../../item'
import { BoardEvents } from './events'
import { ItemStatesProp } from './item-states-prop'

export interface BoardStateProps<I extends ItemState<Any>> {
  translate: Position
  scale: number
  itemStateList: I[]
}

export class BoardState<TEvents extends BoardEvents, TItemState extends ItemState<Any> = ItemState<Any>>
  implements Emitterable<Emitter<TEvents>>
{
  emitter: Emitter<TEvents>

  translate: PositionProp<'setTranslate'>

  scale: Prop<'setScale', number>

  itemStates: ItemStatesProp<'setItemStates', TItemState>

  constructor(props: BoardStateProps<TItemState>) {
    this.emitter = new Emitter<TEvents>()

    this.translate = new PositionProp('setTranslate', props.translate, this.emitter)

    this.scale = new Prop('setScale', props.scale, this.emitter)

    this.itemStates = new ItemStatesProp('setItemStates', props.itemStateList, this)
  }
}
