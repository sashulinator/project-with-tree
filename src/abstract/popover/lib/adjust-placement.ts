import { Points, flipPointHorizontally, flipPointVertically } from '../../align'

interface Context {
  points: Points
  adjustedPoints: Points
  isXAdjusted: boolean
  isYAdjusted: boolean
}

export function adjustPoints(ctx: Context): Points {
  let newAdjustedPoints = ctx.points

  if (ctx.isYAdjusted) {
    newAdjustedPoints = [newAdjustedPoints[0], flipPointVertically(newAdjustedPoints[1])]
  }
  if (ctx.isXAdjusted) {
    newAdjustedPoints = [newAdjustedPoints[0], flipPointHorizontally(newAdjustedPoints[1])]
  }

  return newAdjustedPoints[0] === ctx.adjustedPoints[0] && newAdjustedPoints[1] === ctx.adjustedPoints[1]
    ? ctx.adjustedPoints
    : newAdjustedPoints
}
