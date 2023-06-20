// import { Rule } from '~/entities/rule'
import { Any, Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface Point<P = Dictionary<Any>> {
  id: Id
  name: string
  description?: string
  type: string
  x: number
  y: number
  componentName?: string
  computation?: 'parallel' | 'successively'
  props?: P
}
