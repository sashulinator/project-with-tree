import { Id } from '~/utils/core'

import { Point } from './point'

export interface Decision {
  id: Id
  name: string
  createDttm: string
  updateDttm: string
  updatedBy: string
  createdBy: string
  decisionTree: Point[]
  keyName: string
  rev: string
}
