import { Id, Key } from '~/utils/core'
import { find, get } from '~/utils/dictionary'
import { Emitter, Prop } from '~/utils/emitter'
import { findNext, findPrevious, toDictionary } from '~/utils/list'

export type Events<TItem> = {
  selected: { value: Id[] }
  preselected: { value: Id[] }

  add: { item: TItem }
  update: { item: TItem }
  remove: { item: TItem }
}

export class Controller<TItem, E extends Events<TItem> = Events<TItem>> extends Emitter<E> {
  selected: Prop<'selected', Id[]>

  highlighted: Prop<'highlighted', Id[]>

  items: Record<string, TItem>

  getItemId: (item: TItem) => Id

  constructor(list: TItem[], getItemId: (item: TItem) => Id) {
    super()

    this.selected = new Prop('selected', [] as Id[], this)

    this.highlighted = new Prop('highlighted', [] as Id[], this)

    this.items = toDictionary(getItemId, list) || {}

    this.getItemId = getItemId
  }

  get = (id: Key | undefined): TItem => {
    return get(this.items, id)
  }

  find = (id: Key | undefined): TItem | undefined => {
    return find(this.items, id)
  }

  add = (item: TItem, event?: Record<string, unknown>): void => {
    this.items[this.getItemId(item)] = item
    this.emit('add', { item, ...event })
  }

  update = (item: TItem, event?: Record<string, unknown>): void => {
    this.items[this.getItemId(item)] = item
    this.emit('update', { item, ...event })
  }

  remove = (key: Key, event?: Record<string, unknown>): void => {
    const item = this.get(key)
    this.items[this.getItemId(item)] = item
    delete this.items[this.getItemId(item)]
    this.emit('remove', { item, ...event })
  }

  findNext = (id: Id, recursive = true): TItem | undefined => {
    const list = Object.entries(this.items)
    return findNext(([iId]) => iId === id, list, recursive)?.[1]
  }

  findPrevious = (id: Id, recursive = true): TItem | undefined => {
    const list = Object.entries(this.items)
    return findPrevious(([iId]) => iId === id, list, recursive)?.[1]
  }

  selectNext = (): void => {
    const id = this.selected.value[0]
    const item = this.findNext(id)
    if (!item) return
    this.selected.set([this.getItemId(item)])
  }

  selectPrevious = (): void => {
    const id = this.selected.value[0]
    const item = this.findPrevious(id)
    if (!item) return
    this.selected.set([this.getItemId(item)])
  }

  highlightNext = (): void => {
    const id = this.highlighted.value[0]
    const item = this.findNext(id)
    if (!item) return
    this.highlighted.set([this.getItemId(item)])
  }

  highlightPrevious = (): void => {
    const id = this.highlighted.value[0]
    const item = this.findPrevious(id)
    if (!item) return
    this.highlighted.set([this.getItemId(item)])
  }
}
