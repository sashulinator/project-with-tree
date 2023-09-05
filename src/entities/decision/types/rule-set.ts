import { Id } from '~/utils/core'

import { Rule } from './rule'

export interface RuleSet {
  id?: Id | undefined
  rules?: Rule[]
  index: number
}
