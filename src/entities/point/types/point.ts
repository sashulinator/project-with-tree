import { Rule } from '~/entities/rule'
import { Any, Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface Point<P = Dictionary<Any>> {
  id: Id
  name: string
  type: string
  x: number
  y: number
  rules?: Rule[]
  componentName?: string
  props?: P
  children?: Id[]
}
