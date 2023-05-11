import { Point } from '~/entities/point'
import { Id } from '~/utils/core'

import { LinkedItem as LinkedDecision } from './linked-item'

export interface Decision {
  id: Id
  version: string
  status: string
  data: (Point | LinkedDecision)[]
}
