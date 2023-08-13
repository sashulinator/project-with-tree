import { BaseError } from '../error'
import { Props } from './types/_props'

/**
 * Checks that the given value is a string.
 *
 * @param {unknown} val - The value to check.
 * @param {string} [msg] - An optional error message to include if the check fails.
 * @throws {Error} if the value is not string.
 */
export function assertInteger(val: unknown | null, errorProps?: Props): asserts val is string {
  if (typeof val !== 'number' && Number.isNaN(val)) {
    throw new BaseError(errorProps?.message || 'Value is not an integer.', { code: 'assertInteger', ...errorProps })
  }
}
