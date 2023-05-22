import { Id } from '~/utils/core'

import { DecisionItem } from './decision-item'

export interface Decision {
  id: Id
  version: string
  status: string
  data: DecisionItem[]
}
