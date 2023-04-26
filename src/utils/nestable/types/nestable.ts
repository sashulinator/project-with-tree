import { Id } from '~/utils/core'

export interface Nestable {
  id: Id
  children?: Id[]
}
