// import { Rule } from '~/entities/rule'
import { Any, Id, Position } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface Point<P = Dictionary<Any>> {
  id: Id
  name?: string
  level: 'arbitration' | 'main' | 'decisionPoint' | 'controlGroup' | 'offer'
  position: Position
  componentName?: string
  computation?: 'parallel' | 'successively'
  props?: P
  children?: unknown[]
}
