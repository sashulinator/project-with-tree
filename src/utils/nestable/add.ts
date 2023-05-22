import { Dictionary } from '../dictionary'
import { addChild } from './add-child'
import { Nestable } from './types/nestable'
import { Position } from './types/position'

export function add<N extends Nestable>(nestables: Dictionary<N>, nestable: N, position: Position): Dictionary<N> {
  const destinationNestable = addChild(nestables[position.id], position.index, nestable.id)

  return { ...nestables, [destinationNestable.id]: destinationNestable, [nestable.id]: nestable }
}
