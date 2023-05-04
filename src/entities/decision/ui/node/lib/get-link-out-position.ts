import { linkOut } from '../constants/link-out'

interface Size {
  width: number
  height: number
}

interface CirclePosition {
  cy: number
  cx: number
  r: number
}

export function getLinkOutProps(size: Size, i: number): CirclePosition {
  return {
    cy: size.height,
    cx: size.width - (linkOut.r + linkOut.gap) * i - linkOut.r * 2,
    r: linkOut.r,
  }
}
