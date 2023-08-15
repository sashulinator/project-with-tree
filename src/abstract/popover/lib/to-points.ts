import { Point, Points, flipPointHorizontally, flipPointVertically } from 'dom-align-ts'

/**
 * Converts a placement string to an array of `Point`s for positioning an element relative to another element.
 *
 * @param {Point} placement - The placement string to convert.
 *
 * @returns {Points} - An array of two `Point`s used to position an element relative to another element.
 */
export function toPoints(placement: Point): Points {
  if (placement.charAt(0) === 'c') {
    return [flipPointHorizontally(placement), placement]
  }

  return [flipPointVertically(placement), placement]
}
