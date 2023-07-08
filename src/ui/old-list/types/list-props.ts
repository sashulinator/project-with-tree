import { ForwardedRef } from 'react'

import { ItemProps } from './item-props'
import { Key } from './key'
import { ListState } from './list-state'

export interface ListProps<T, TItemProps> {
  rootProps?: React.HTMLAttributes<HTMLUListElement> & { ref?: ForwardedRef<HTMLUListElement> }
  itemProps?: TItemProps | undefined
  data: T[]
  checked?: Key[]
  selected?: Key[]
  listStateRef?: ForwardedRef<ListState<T>>
  isSelectable?: (item: T) => boolean
  onCheck?: ((checked: Key[]) => void) | undefined
  onCheckOne?: ((checked: Key) => void) | undefined
  onUncheckOne?: ((checked: Key) => void) | undefined
  onSelect?: ((selected: Key[]) => void) | undefined
  onSelectOne?: ((selected: Key) => void) | undefined
  onUnselectOne?: ((selected: Key) => void) | undefined
  onFocus?: ((item: T, i: number, element: HTMLLIElement | undefined | null) => void) | undefined
  onBlur?: (() => void) | undefined
  getItemKey: (item: T, data: T[]) => Key
  renderItem: (props: ItemProps<T, TItemProps>) => JSX.Element | null
}
