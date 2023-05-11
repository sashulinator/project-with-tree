import { Id } from '~/utils/core'

import { Point } from '../../point/types/point'

export interface LinkedItem {
  id: Id
  linkedId: Id
  overwritten?: (Point | Partial<LinkedItem>)[]
}
