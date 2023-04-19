import { ItemState } from './item-state'
import { Key } from './key'
import { ListState } from './list-state'

export interface ItemProps<T, TItemProps> {
  item: T
  itemKey: Key
  itemState: ItemState<T>
  itemProps: TItemProps | undefined
  isChecked: boolean
  isSelected: boolean
  listState: ListState<T>
  setElementRef: (instance: HTMLLIElement) => void
  getItemKey: (item: T, data: T[]) => Key
}
