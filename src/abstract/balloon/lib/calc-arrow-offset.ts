import { Offset, Point } from 'dom-align-ts'

/**
 * Calculates the x and y offsets for the arrow component of a balloon based on the given placement string.
 *
 * @param {Point} placement - The placement string used to position the balloon. The arrow component will be positioned relative to this.
 *
 * @returns {Offset} - An array of two strings representing the x and y offsets for the arrow component.
 */

export function calcArrowOffset(placement: Point): Offset {
  const isLeft = placement.charAt(1) === 'l'
  const isRight = placement.charAt(1) === 'r'
  const isTop = placement.charAt(0) === 't'
  const isBottom = placement.charAt(0) === 'b'
  const isCenter = placement.charAt(0) === 'c'

  if (isCenter) {
    const offsetX = isLeft ? '-50%' : isRight ? '50%' : 0
    return [offsetX, 0]
  }

  const offsetX = isLeft ? '-50%' : isRight ? '50%' : 0
  const offsetY = isTop ? '-50%' : isBottom ? '50%' : 0
  return [offsetX, offsetY]
}
