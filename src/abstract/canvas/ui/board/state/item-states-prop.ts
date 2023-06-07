import { EventNames, Events } from '~/entities/point'
import { Any, Id } from '~/utils/core'
import { get } from '~/utils/dictionary'
import { EmitterableProp } from '~/utils/emitter'
import { toDictionary } from '~/utils/list'

import { ItemState } from '../../item'
import { BoardState } from './state'

type ItemStates<S extends ItemState<Any>> = Record<Id, S>

export class ItemStatesProp<N extends string, S extends ItemState<Any>> extends EmitterableProp<N, ItemStates<S>> {
  constructor(eventName: N, itemStatesList: S[], boardState: BoardState<Any, Any>) {
    const itemStates = toDictionary((item) => item.id, itemStatesList) || {}

    super(eventName, itemStates, boardState)

    for (let index = 0; index < itemStatesList.length; index++) {
      const item = itemStatesList[index]
      item.emitter.onAll((eventName, event) => {
        boardState.emitter.emit(eventName, { itemId: item.id, ...event })
      })
    }
  }

  emit = <E extends EventNames>(id: Id, eventName: E, event: Events[E]): void => {
    const state = this.get(id)
    state.emitter.emit(eventName, event)
  }

  get = (id: Id | undefined): S => {
    return get(this.value, id)
  }
}
