import { Rule } from '~/entities/rule'
import { Id } from '~/utils/core'

import { DecisionItem } from './decision-item'

export interface Decision {
  id: Id
  name: string
  data: DecisionItem[]
  rules?: Rule[]
  updateDttm: string
  createDttm: string
  updatedBy: string
  createdBy: string
  description: string
  keyName: string
  rev: string
}
