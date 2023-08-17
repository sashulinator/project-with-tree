import { Points } from '..'

export function arePointsEqual(p1: Points, p2: Points): boolean {
  return p1[0] === p2[0] && p1[1] === p2[1]
}
