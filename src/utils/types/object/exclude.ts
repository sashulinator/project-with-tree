import type { Match } from '../any/_internal'
import type { ExcludeKeys } from './exclude-keys'
import type { Pick } from './pick'

/**
 * Exclude the fields of `O1` out of `O`
 * (If `match = 'default'`, no type checks are done)
 * @param O to remove from
 * @param O1 to remove out
 * @param match (?=`'default'`) to change precision
 * @returns [[Object]]
 * @example
 * ```ts
 * ```
 */
export type Exclude<O extends object, O1 extends object, match extends Match = 'default'> = Pick<
  O,
  ExcludeKeys<O, O1, match>
>
