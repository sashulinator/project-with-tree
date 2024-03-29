import { Emitter } from '..'
import { Key, find, get } from '../../dictionary'
import { toDictionary } from '../../list'

export type DictionaryEvents<TItem> = {
  add: { item: TItem }
  update: { item: TItem }
  remove: { item: TItem }
}

/**
 * Позволяет подписаться на события добвления/обновления/удаления
 */
export class Dictionary<TItem, E extends DictionaryEvents<TItem> = DictionaryEvents<TItem>> extends Emitter<E> {
  items: Record<Key, TItem>

  getKey: (s: TItem) => string

  constructor(itemList: TItem[], getKey: (s: TItem) => string) {
    super()

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

  add = (item: TItem, event?: Record<string, unknown>): void => {
    this.items[this.getKey(item)] = item
    this.emit('add', { item, ...event })
  }

  update = (item: TItem, event?: Record<string, unknown>): void => {
    this.items[this.getKey(item)] = item
    this.emit('update', { item, ...event })
  }

  remove = (key: Key, event?: Record<string, unknown>): void => {
    const item = this.get(key)
    this.items[this.getKey(item)] = item
    delete this.items[this.getKey(item)]
    this.emit('remove', { item, ...event })
  }
}
