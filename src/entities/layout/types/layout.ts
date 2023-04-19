import { Id } from '~/utils/core'

import { LayoutItem } from './layout-item'
import { LinkedLayoutItem } from './linked-layout-item'

export interface Layout {
  id: Id
  data: (LayoutItem | LinkedLayoutItem)[]
}
