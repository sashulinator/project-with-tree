import { i18n } from '~/shared/i18n'
import { Any, isObject } from '~/utils/core'
import { Dictionary, setPath, walk } from '~/utils/dictionary'

import { ReplaceValuesByGetter } from './types/_replace-values-by-getter'

/**
 * Transforms data "{ a: { b: '', c: '' }, d: '' }" to
 * "{ a: 'ns:a', { b: 'ns:a.b', c: 'ns:a.c' } d: 'ns:d' } }"
 */

export function generateSchema<T extends Dictionary<Any>>(structure: T, ns: string): ReplaceValuesByGetter<T> {
  let schema = {}
  walk(structure, ({ value, path }) => {
    if (!isObject(value)) {
      const key = `${ns}:${path.join('.')}`
      schema = setPath(path, (params) => i18n.t(key, params), schema)
    }
  })

  return schema as unknown as T
}
