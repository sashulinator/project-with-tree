import { Id } from '~/utils/core'

import { Link } from './base'

export interface Arbitration {
  id: Id
  name: string
  level: 'arbitration'
  xy: [number, number]
  props?: {
    maxOffers?: number
    arbFormula?: Id
    sortDesc?: string
  }
  children?: Link[]
}
