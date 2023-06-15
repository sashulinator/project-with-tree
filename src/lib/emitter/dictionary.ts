import { Emitter } from '~/lib/emitter'
import { toDictionary } from '~/utils/list'

import { Any, Id } from '../../utils/core'
import { Dictionary as IDictionary, find, get } from '../../utils/dictionary'

type Events<I> = {
  add: { item: I }
  update: { item: I }
  remove: { key: Id }
}

/**
 * Позволяет производить CRUD операции и подписывает `emitter` на все события `emitter`a элемента
 */
export class EmitterableDictionary<E extends Events<S>, S extends Emitter<Any>> extends Emitter<E> {
  items: IDictionary<S>

  getKey: (s: S) => string

  constructor(emitterables: S[], getKey: (s: S) => string) {
    super()

    this.getKey = getKey

    this.items = toDictionary(getKey, emitterables) || {}

    this.subscribeToItemEvents(emitterables)

    this.subscribeToCRUDEvents()
  }

  private subscribeToItemEvents(emitterables: S[]): void {
    for (let index = 0; index < emitterables.length; index++) {
      const item = emitterables[index]
      item.onAll((eventName, event) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        this.emit(eventName as any, { itemId: this.getKey(item), ...event })
      })
    }
  }

  private subscribeToCRUDEvents(): void {
    this.on('add', (event) => (this.items[this.getKey(event.item)] = event.item))
    this.on('update', (event) => (this.items[this.getKey(event.item)] = event.item))
    this.on('remove', (event) => setTimeout(() => delete this.items[event.key]))
  }

  values(): S[] {
    return Object.values(this.items)
  }

  get = (id: Id | undefined): S => {
    return get(this.items, id)
  }

  find = (id: Id | undefined): S | undefined => {
    return find(this.items, id)
  }

  add = (item: S): void => {
    this.emit('add', { item })
  }

  update = (item: S): void => {
    this.emit('update', { item })
  }

  remove = (key: Id): void => {
    this.emit('remove', { key })
  }
}
