import { Id } from '~/utils/core'

export interface Rule {
  id: Id
  name: string
  value?: string
  sourceId?: Id
  targetId?: Id
}
