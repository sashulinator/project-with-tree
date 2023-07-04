import { Id } from '~/utils/core'

export interface Rule {
  id: Id
  name: string
  value?: string
  i: number
  sourceId?: Id
  targetId?: Id
}
