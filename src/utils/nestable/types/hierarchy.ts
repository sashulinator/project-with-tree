import { Id } from '~/utils/core'

export interface Hierarchy {
  id: Id
  children?: Hierarchy[]
}
