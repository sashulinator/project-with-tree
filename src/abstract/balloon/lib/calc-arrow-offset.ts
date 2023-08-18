import { Offset, Point } from 'dom-align-ts'

/**
 * Calculates the x and y offsets for the arrow component of a balloon based on the given placement string.
 *
 * @param {Point} placement - The placement string used to position the balloon. The arrow component will be positioned relative to this.
 *
 * @returns {Offset} - An array of two strings representing the x and y offsets for the arrow component.
 */

export function calcArrowOffset(placement: Point): Offset {
  if (placement === 'tl') {
    return ['-100%', '-50%']
  }
  if (placement === 'tr') {
    return ['100%', '-50%']
  }
  if (placement === 'tc') {
    return [0, '-50%']
  }
  if (placement === 'bl') {
    return ['-100%', '50%']
  }
  if (placement === 'br') {
    return ['100%', '50%']
  }
  if (placement === 'bc') {
    return [0, '50%']
  }
  if (placement === 'cr') {
    return ['50%', 0]
  }
  if (placement === 'cl') {
    return ['-50%', 0]
  }
  return [0, 0]
}
