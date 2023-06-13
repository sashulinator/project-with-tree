import { Emitter } from '~/lib/emitter'
import { toDictionary } from '~/utils/list'

import { Any, Id } from '../core'
import { Dictionary as IDictionary, find, get } from '../dictionary'
import { AnyEvent, Emitter as IEmitter } from './types/emitter'
import { Emitterable } from './types/emitterable'

type Events<I> = {
  add: { item: I }
  update: { item: I }
  remove: { key: Id }
}

/**
 * Позволяет производить CRUD операции и подписывает `emitter` на все события `emitter`a элемента
 */
export class EmitterableDictionary<E extends AnyEvent, S extends IEmitter<Any>> implements Emitterable<IEmitter<Any>> {
  emitter: IEmitter<E & Events<S>>

  items: IDictionary<S>

  getKey: (s: S) => string

  constructor(emitterables: S[], getKey: (s: S) => string) {
    this.emitter = new Emitter()

    this.getKey = getKey

    this.items = toDictionary(getKey, emitterables) || {}

    this.subscribeToItemEvents(emitterables)

    this.subscribeToCRUDEvents()
  }

  private subscribeToItemEvents(emitterables: S[]) {
    for (let index = 0; index < emitterables.length; index++) {
      const item = emitterables[index]
      item.onAll((eventName, event) => {
        this.emitter.emit(eventName, { itemId: this.getKey(item), ...event })
      })
    }
  }

  private subscribeToCRUDEvents() {
    this.emitter.on('add', (event) => (this.items[this.getKey(event.item)] = event.item))
    this.emitter.on('update', (event) => (this.items[this.getKey(event.item)] = event.item))
    this.emitter.on('remove', (event) => delete this.items[event.key])
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

  add = (item: S) => {
    this.emitter.emit('add', { item })
  }

  update = (item: S) => {
    this.emitter.emit('update', { item })
  }

  remove = (key: Id) => {
    this.emitter.emit('remove', { key })
  }
}
