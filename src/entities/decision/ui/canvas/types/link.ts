import { PointState } from '~/entities/point/state'
import { Rule } from '~/entities/rule'

export interface Link {
  rule?: Rule
  sourceState?: PointState
  targetState?: PointState
}
