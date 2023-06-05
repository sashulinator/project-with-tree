import { Emitter } from '~/lib/emitter'
import { Any } from '~/utils/core'
import { Emitterable, EmitterableProp as Prop } from '~/utils/emitter'
import { Position, PositionProp } from '~/widgets/canvas'

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

    this.translate = new PositionProp('setTranslate', props.translate, this)

    this.scale = new Prop('setScale', props.scale, this)

    this.itemStates = new ItemStatesProp('setItemStates', props.itemStateList, this)
  }
}
