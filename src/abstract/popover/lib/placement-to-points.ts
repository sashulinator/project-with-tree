import { Point, Points, flipPointHorizontally, flipPointVertically } from '../../align'

/**
 * Converts a placement string to an array of `Point`s for positioning an element relative to another element.
 *
 * @param {Point} placement - The placement string to convert.
 *
 * @returns {Points} - An array of two `Point`s used to position an element relative to another element.
 */
export function placementToPoints(placement: Point): Points {
  if (placement.charAt(0) === 'c') {
    return [flipPointHorizontally(placement), placement]
  }

  return [flipPointHorizontally(flipPointVertically(placement)), flipPointHorizontally(placement)]
}
