import { Id } from '~/utils/core'

import { Link } from './base'

export interface DecisionPoint {
  id: Id
  name: string
  level: 'decisionPoint'
  xy: [number, number]
  computation: 'parallel' | 'successively'
  children?: Link[]
}
