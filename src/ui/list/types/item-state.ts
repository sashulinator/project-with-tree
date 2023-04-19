import { RefObject } from 'react'

import { Key } from './key'

export interface ItemState<T> {
  index: number
  item: T
  elementRef: RefObject<HTMLLIElement>
  itemKey: Key
  map: Map<Key | HTMLLIElement, ItemState<T>>
}
