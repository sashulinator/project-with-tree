import { BaseError } from '../error'
import { Props } from './types/_props'

/**
 * Checks that the given value is not undefined.
 *
 * @template T - The type of the value being checked.
 * @param {T | undefined} val - The value to check.
 * @param {Props} [errorProps] - An optional error props to include if the check fails.
 * @throws {Error} if the value is undefined.
 */
export function assertDefined<T>(val: T | undefined, errorProps?: Props): asserts val is T {
  if (val === undefined) {
    throw new BaseError(errorProps?.message || 'Value cannot be undefined.', { code: 'assertDefined', ...errorProps })
  }
}
