// import { Rule } from '~/entities/rule'
import { Any, Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

import { Rule } from './rule'

export interface Point<P = Dictionary<Any>> {
  id: Id
  name?: string
  level: 'arbitration' | 'main' | 'decisionPoint' | 'controlGroup' | 'offer'
  xy: [number, number]
  componentName?: string
  computation?: 'parallel' | 'successively'
  props?: P
  children?: Link[]
}

export interface Link {
  id?: Id | undefined
  rules?: Rule[]
  index: number
}
