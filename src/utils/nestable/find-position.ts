import { Id } from '../core'
import { Dictionary } from '../dictionary'
import { findParent } from './find-parent'
import { Nestable } from './types/nestable'
import { Position } from './types/position'

export function findPosition<N extends Nestable>(nestables: Dictionary<N>, id: Id): Position | undefined {
  const parentEntity = findParent(nestables, id)

  if (parentEntity === undefined) return undefined

  const index = parentEntity.children?.indexOf(id)

  if (index === undefined) throw new Error('Impossible error.')

  return {
    index,
    id: parentEntity.id,
  }
}
