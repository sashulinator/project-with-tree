import { Any, Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface Link {
  id: string
  name: string
  type: string
  value: string
}

export interface Point<P = Dictionary<Any>> {
  id: Id
  name: string
  type: string
  x: number
  y: number
  links?: Link[]
  componentName?: string
  props?: P
  children?: Id[]
}
