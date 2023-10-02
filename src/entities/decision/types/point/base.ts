import { Id } from '~/utils/core'

import { Rule } from '../rule'
import { Arbitration } from './arbitration'
import { ControlGroup } from './control-group'
import { DecisionPoint } from './decision-point'
import { Main } from './main'
import { Offer } from './offer'

export interface Base {
  id: Id
  xy: [number, number]
  level: string
}

export interface Link {
  id?: Id | undefined
  rules?: Rule[]
  index: number
}

export type Point = Arbitration | ControlGroup | DecisionPoint | Main | Offer
