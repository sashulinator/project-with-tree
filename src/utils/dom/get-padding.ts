import { Side } from './types/side'

export function getPadding(computedStyles: CSSStyleDeclaration, sides: Side[]): number {
  return sides.reduce((acc, side) => {
    const value = computedStyles[`padding${side}`]
    return value ? acc + parseInt(value) : acc
  }, 0)
}
