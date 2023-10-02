import { Id } from '~/utils/core'

import { Link } from './base'

export interface ControlGroup {
  id: Id
  name: string
  level: 'controlGroup'
  xy: [number, number]
  props?: {
    partitionType?: string
    partitionTypeId?: Id
    percentCg?: number
  }
  children?: Link[]
}
