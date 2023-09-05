import { Point } from '~/abstract/tooltip'
import { Position } from '~/utils/core'

export function _getAnimationPosition(placement: Point): { from: Position; to: Position } {
  const from = { x: 0, y: 0 }
  const to = { x: 0, y: 0 }

  if (placement.charAt(0) === 'b') {
    from.y = -10
    to.y = 10
    return { from, to }
  }
  if (placement.charAt(0) === 't') {
    from.y = 10
    to.y = -10
    return { from, to }
  }
  if (placement.charAt(1) === 'l') {
    from.x = 10
    to.x = -10
    return { from, to }
  }

  if (placement.charAt(1) === 'r') {
    from.x = -10
    to.x = 10
    return { from, to }
  }

  return { from, to }
}
