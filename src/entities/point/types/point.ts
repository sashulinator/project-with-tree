// import { Rule } from '~/entities/rule'
import { Any, Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

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

export interface RuleSet {
  id?: Id | undefined
  rules: Rule[]
  index: number
}

export interface Rule {
  level: 'rule'
  name: string
  id: Id
  value: string
}
