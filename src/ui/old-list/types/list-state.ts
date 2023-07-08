import { Emitter } from 'mitt'
import { RefObject } from 'react'

import { Events } from './events'
import { ItemState } from './item-state'
import { Key } from './key'

export interface ListState<T> {
  map: Map<Key | HTMLLIElement, ItemState<T>>
  mitt: Emitter<Events>
  checkedRef: RefObject<Key[]>
  selectedRef: RefObject<Key[]>
  elementRef: RefObject<HTMLUListElement>
  data: T[]
  getItemKey: (item: T, data: T[]) => Key
  focus: (key?: Key) => void
  unfocus: () => void
  selectOne: (key: Key) => void
  setChecked: (checked: Key[]) => void
  setSelected: (selected: Key[]) => void
  checkOne: (key: Key) => void
  unselectOne: (key: Key) => void
  uncheckOne: (key: Key) => void
}
