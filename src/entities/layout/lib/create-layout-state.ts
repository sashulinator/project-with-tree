import mitt from 'mitt'

import { Layout, LayoutItem, LayoutState } from '~/entities/layout'
import { assertDefined, assertNotNull } from '~/utils/core'
import { toDictionary } from '~/utils/list'

import { EventNames } from '../types/event-names'
import { Events } from '../types/events'

export function createLayoutState(layout: Layout | undefined): LayoutState | null {
  if (layout === undefined) {
    return null
  }

  const items = toDictionary((item) => item.id, layout.data)
  assertNotNull(items)

  const m = mitt<Events>()

  m.on(EventNames.setItem, (item: LayoutItem): void => {
    assertDefined(state.items[item.id])
    state.items[item.id] = item
  })

  const state: LayoutState = {
    items,
    layout,
    mitt: m,
  }

  return state
}
