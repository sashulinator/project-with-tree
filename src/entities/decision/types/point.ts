// import { Rule } from '~/entities/rule'
import { Any, Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

import { RuleSet } from './rule-set'

export interface Point<P = Dictionary<Any>> {
  id: Id
  name?: string
  level: 'arbitration' | 'main' | 'decisionPoint' | 'controlGroup' | 'offer'
  xy: [number, number]
  componentName?: string
  computation?: 'parallel' | 'successively'
  props?: P
  children?: RuleSet[]
}
