import { toDictionary } from '~/utils/list'

import { Id as Key } from '../../utils/core'
import { Dictionary as IDictionary, find, get } from '../../utils/dictionary'
import { Emitter } from './emitter'
import { Notifier } from '../notifier'
import { EventNotifiers } from './types/event-notifiers'

export type DictionaryEvents<Item> = {
  add: { item: Item }
  update: { item: Item }
  remove: { item: Item }
}

/**
 * Позволяет подписаться на события добвления/обновления/удаления
 */
export class Dictionary<TItem, E extends DictionaryEvents<TItem> = DictionaryEvents<TItem>> extends Emitter<E> {
  items: IDictionary<TItem>

  getKey: (s: TItem) => string

  constructor(eventNotifiers: EventNotifiers<E>, itemList: TItem[], getKey: (s: TItem) => string) {
    super(eventNotifiers)

    this.getKey = getKey

    this.items = toDictionary(getKey, itemList) || {}
  }

  values(): TItem[] {
    return Object.values(this.items)
  }

  get = (id: Key | undefined): TItem => {
    return get(this.items, id)
  }

  find = (id: Key | undefined): TItem | undefined => {
    return find(this.items, id)
  }

  add = (item: TItem): void => {
    this.items[this.getKey(item)] = item
    this.emit('add', { item })
  }

  update = (item: TItem): void => {
    this.items[this.getKey(item)] = item
    this.emit('update', { item })
  }

  remove = (key: Key): void => {
    const item = this.get(key)
    this.items[this.getKey(item)] = item
    delete this.items[this.getKey(item)]
    this.emit('remove', { item })
  }
}
