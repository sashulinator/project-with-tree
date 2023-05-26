import { Id } from '~/utils/core'

export interface Rule {
  id: Id
  pointId?: Id
  name: string
  type: string
  value?: string
}
