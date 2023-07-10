import { assertDefined } from '~/utils/core'
import { assertNotNil } from '~/utils/core/assertions/not-nil'

import { ItemState } from '../types/item-state'
import { Key } from '../types/key'
import { ListState } from '../types/list-state'

/**
 * Получить mapItem
 * @param stateRef
 * @returns
 */
export function getMapItem<T>(
  stateRef: ListState<T> | undefined | null,
  key: Key | HTMLLIElement | undefined
): ItemState<T> {
  assertDefined(key)
  assertNotNil(stateRef)
  const mapItem = stateRef.map.get(key)
  assertDefined(mapItem)
  return mapItem
}
