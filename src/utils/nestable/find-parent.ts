import { Id } from '../core'
import { Dictionary } from '../dictionary'
import { Nestable } from './types/nestable'

export function findParent<N extends Nestable>(nestables: Dictionary<N>, id: Id): N | undefined {
  return Object.values(nestables).find((item) => item.children?.includes(id.toString()))
}
