import { ItemState } from '../types/item-state'
import { ListState } from '../types/list-state'
import { getMapItem } from './get-map-item'

/**
 * Получить первый mapItem в массиве checked | selected | data
 *
 * Проблематика:
 * 1. Сфокусироваться на каком-то айтеме при фокусе на листе
 * 2. Подскрол к какому-то айтему
 * @param stateRef
 * @returns
 */
export function getPrimaryMapItem<T>(stateRef: ListState<T> | undefined | null): ItemState<T> {
  const key =
    stateRef?.checkedRef.current?.[0] ||
    stateRef?.selectedRef.current?.[0] ||
    stateRef?.getItemKey(stateRef.data[0], stateRef.data)

  return getMapItem(stateRef, key)
}
