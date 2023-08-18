import { Id } from '~/utils/core'

import { DecisionItem } from './decision-item'

export interface Decision {
  id: Id
  name: string
  createDttm: string
  updateDttm: string
  updatedBy: string
  createdBy: string
  decisionTree: DecisionItem[]
  keyName: string
  rev: string
}
