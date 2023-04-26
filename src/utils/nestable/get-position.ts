import { Id } from '../core'
import { Dictionary } from '../dictionary'
import { findPosition } from './find-position'
import { Nestable } from './types/nestable'
import { Position } from './types/position'

export function getPosition<N extends Nestable>(nestables: Dictionary<N>, id: Id): Position {
  const position = findPosition(nestables, id)

  if (position === undefined) {
    throw new Error('Cannot get position.')
  }

  return position
}
