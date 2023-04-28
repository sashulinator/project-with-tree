import { Any, Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface Node<P = Dictionary<Any>> {
  id: Id
  name: string
  type: string
  links?: Dictionary<Id>
  componentName?: string
  props?: P
  children?: Id[]
}
