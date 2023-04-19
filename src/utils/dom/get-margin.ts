import { Side } from './types/side'

export function getMargin(computedStyles: CSSStyleDeclaration, sides: Side[]): number {
  return sides.reduce((acc, side) => {
    const value = computedStyles[`margin${side}`]
    return value ? acc + parseInt(value) : acc
  }, 0)
}
