import { Any } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export type ReplaceValuesByGetter<T extends Dictionary<Any>> = {
  [K in keyof T]: T[K] extends Dictionary<Any> ? ReplaceValuesByGetter<T[K]> : (p?: Dictionary<Any>) => string
}
