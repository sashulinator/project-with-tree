/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */
export function clamp(number: number, lower: number, upper: number): number {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower
    }
  }
  return number
}
