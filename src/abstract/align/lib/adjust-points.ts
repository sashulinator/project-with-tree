import { Points, flipPointHorizontally, flipPointVertically } from '../../align'

interface AlignResult {
  points: Points
  isXAdjusted: boolean
  isYAdjusted: boolean
}

export function adjustPoints(alignResult: AlignResult): Points {
  let adjustedPoints = alignResult.points

  if (alignResult.isYAdjusted) {
    adjustedPoints = [flipPointVertically(adjustedPoints[0]), flipPointVertically(adjustedPoints[1])]
  }
  if (alignResult.isXAdjusted) {
    adjustedPoints = [flipPointHorizontally(adjustedPoints[0]), flipPointHorizontally(adjustedPoints[1])]
  }

  return adjustedPoints
}
