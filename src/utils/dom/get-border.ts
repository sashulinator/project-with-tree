import { Side } from './types/side'

export function getBorder(computedStyles: CSSStyleDeclaration, sides: Side[]): number {
  return sides.reduce((acc, side) => {
    const value = computedStyles[`border${side}Width`]
    return value ? (acc += parseInt(value)) : acc
  }, 0)
}
