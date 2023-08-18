import { Point } from '~/abstract/tooltip'
import { Position } from '~/utils/core'

export function _getAnimationPosition(placement: Point): { from: Position; to: Position } {
  const from = { x: 0, y: 0 }
  const to = { x: 0, y: 0 }

  if (placement.charAt(0) === 'b') {
    from.y = -5
    to.y = 5
    return { from, to }
  }
  if (placement.charAt(0) === 't') {
    from.y = 5
    to.y = -5
    return { from, to }
  }
  if (placement.charAt(1) === 'l') {
    from.x = 5
    to.x = -5
    return { from, to }
  }

  if (placement.charAt(1) === 'r') {
    from.x = -5
    to.x = 5
    return { from, to }
  }

  return { from, to }
}
