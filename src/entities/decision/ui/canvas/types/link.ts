import { PointState } from '~/entities/point/state'
import { Rule } from '~/entities/rule'
import { Id } from '~/utils/core'

export interface Link {
  rule?: Rule
  sourceState?: PointState
  targetState?: PointState
  sourceRuleId?: Id
}
