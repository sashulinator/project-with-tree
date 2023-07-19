import { toDictionary } from '~/utils/list'

import { Id as Key } from '../core'
import { Dictionary as IDictionary, find, get } from '../dictionary'
import { Emitter } from './emitter'

import { EventNotifiers } from './types/event-notifiers'
import { Notifier } from '../notifier'

export type DictionaryEvents<TItem> = {
  add: { item: TItem }
  update: { item: TItem }
  remove: { item: TItem }
}

/**
 * Позволяет подписаться на события добвления/обновления/удаления
 */
export class Dictionary<TItem> extends Emitter<DictionaryEvents<TItem>> {
  items: IDictionary<TItem>

  getKey: (s: TItem) => string

  constructor(itemList: TItem[], getKey: (s: TItem) => string) {
    super({
      add: new Notifier(),
      update: new Notifier(),
      remove: new Notifier(),
    })

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
