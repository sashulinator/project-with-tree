import { Any, Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface LayoutItem<P = Dictionary<Any>> {
  id: Id
  name: string
  componentName: string
  props: P
  children?: Id[]
}
