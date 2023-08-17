import { Offset, Points } from '..'

export function getOffset(points: Points | null): Offset {
  if (!points) return [0, 0]

  if (points[1] === 'tl') {
    return [0, 0]
  }
  return [0, 0]
}
