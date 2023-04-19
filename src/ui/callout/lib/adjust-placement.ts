import { Point, flipPointHorizontally, flipPointVertically } from 'dom-align-ts'

export function adjustPlacement(placement: Point, adjustments: { x: boolean; y: boolean }): Point {
  const horizontalPlacement = adjustments.x ? flipPointHorizontally(placement) : placement
  return adjustments.y ? flipPointVertically(horizontalPlacement) : horizontalPlacement
}
