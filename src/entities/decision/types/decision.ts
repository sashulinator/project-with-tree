import { Id } from '~/utils/core'

import { Item } from './item'
import { LinkedItem } from './linked-item'

export interface Decision {
  id: Id
  data: (Item | LinkedItem)[]
}
