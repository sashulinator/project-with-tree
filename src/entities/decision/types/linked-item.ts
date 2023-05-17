import { Id } from '~/utils/core'

import { Point } from '../../point/types/point'

export interface LinkedDecision {
  id: Id
  linkedId: Id
  overwritten?: (Point | Partial<LinkedDecision>)[]
}
