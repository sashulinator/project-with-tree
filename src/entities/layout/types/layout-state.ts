import { Emitter } from 'mitt'

import { Dictionary } from '~/utils/dictionary'

import { Events } from './events'
import { Layout } from './layout'
import { LayoutItem } from './layout-item'
import { LinkedLayoutItem } from './linked-layout-item'

export interface LayoutState {
  layout: Layout
  items: Dictionary<LayoutItem | LinkedLayoutItem>
  mitt?: Emitter<Events>
}
