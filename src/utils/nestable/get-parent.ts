import { Id } from '../core'
import { Dictionary } from '../dictionary'
import { findParent } from './find-parent'
import { Nestable } from './types/nestable'

export function getParent<N extends Nestable>(nestables: Dictionary<N>, id: Id): N {
  const parent = findParent(nestables, id)

  if (parent === undefined) {
    throw new Error('Cannot get parent.')
  }

  return parent
}
