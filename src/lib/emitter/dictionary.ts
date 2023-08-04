import { Emitter } from '~/lib/emitter'
import { toDictionary } from '~/utils/list'

import { Any, Id } from '../../utils/core'
import { Dictionary as IDictionary, find, get } from '../../utils/dictionary'

type Events<TState> = {
  add: { state: TState }
  update: { state: TState }
  remove: { state: TState }
}

/**
 * Позволяет производить CRUD операции и подписывает `emitter` на все события `emitter`a элемента
 */
export class EmitterableDictionary<
  TEvents extends Events<TState>,
  TState extends Emitter<Any>,
> extends Emitter<TEvents> {
  items: IDictionary<TState>

  getId: (s: TState) => string

  constructor(emitterables: TState[], getId: (s: TState) => string) {
    super()

    this.getId = getId

    this.items = toDictionary(getId, emitterables) || {}

    this.subscribeToCRUDEvents()

    this.subscribeToItemEvents(emitterables)
  }

  private subscribeToItemEvents(emitterables: TState[]): void {
    for (let index = 0; index < emitterables.length; index++) {
      const item = emitterables[index]
      item.onAll((eventName, ev) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        this.emit(eventName as any, { itemId: this.getId(item), ...ev })
      })
    }
  }

  private subscribeToCRUDEvents(): void {
    this.on('add', (event) => (this.items[this.getId(event.state)] = event.state))
    this.on('update', (event) => (this.items[this.getId(event.state)] = event.state))
    this.on('remove', (event) => {
      event.state.offAll()
      setTimeout(() => delete this.items[this.getId(event.state)])
    })
  }

  values(): TState[] {
    return Object.values(this.items)
  }

  get = (id: Id | undefined): TState => {
    return get(this.items, id)
  }

  find = (id: Id | undefined): TState | undefined => {
    return find(this.items, id)
  }

  add = (item: TState): void => {
    this.emit('add', { state: item })
    this.subscribeToItemEvents([item])
  }

  update = (item: TState): void => {
    this.emit('update', { state: item })
    this.subscribeToItemEvents([item])
  }

  remove = (id: Id): void => {
    const state = this.get(id)
    this.emit('remove', { state })
  }
}
