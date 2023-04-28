import { Id } from '~/utils/core'

import { Item } from './item'

export interface LinkedItem {
  id: Id
  linkedId: Id
  overwritten?: (Item | Partial<LinkedItem>)[]
}
