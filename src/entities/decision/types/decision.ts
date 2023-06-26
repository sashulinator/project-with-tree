import { Rule } from '~/entities/rule'
import { Id } from '~/utils/core'

import { DecisionItem } from './decision-item'

export interface Decision {
  id: Id
  name: string
  version: string
  status: string
  data: DecisionItem[]
  rules?: Rule[]
}
