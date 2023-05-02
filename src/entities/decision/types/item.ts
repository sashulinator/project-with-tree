import { Any, Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface Item<P = Dictionary<Any>> {
  id: Id
  name: string
  type: string
  x: number
  y: number
  links?: { type: string; id: string }[]
  componentName?: string
  props?: P
  children?: Id[]
}
