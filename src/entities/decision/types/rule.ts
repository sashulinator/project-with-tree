import { Id } from '~/utils/core'

export interface Rule {
  level: string
  keyName: string
  name: string
  id: Id
  value: string
}
