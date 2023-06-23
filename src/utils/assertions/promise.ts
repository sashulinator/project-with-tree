import { isPromise } from '../core'
import { BaseError } from '../error'
import { Props } from './types/_props'

/**
 * Checks that the given value is a Promise.
 *
 * @template T - The Promise type being checked.
 * @param {unknown} val - The value to check.
 * @param {Props} [errorProps] - An optional error props to include if the check fails.
 * @throws {Error} if the value is a Promise.
 */
export function assertPromise<T extends Promise<unknown>>(val: unknown, errorProps: Props): asserts val is T {
  if (!isPromise(val)) {
    throw new BaseError(errorProps.message || 'Is not a Promise.', { code: 'assertPromise', ...errorProps })
  }
}
