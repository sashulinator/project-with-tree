import { Any, Key } from '../core'

/**
 * Retrieves the value in a nested object structure specified by the given path.
 *
 * @template D - The type of the dictionary being searched.
 * @template P - The type of the key path being searched for.
 *
 * @param {D} dictionary - The dictionary object being searched.
 * @param {P} path - The path of keys to the desired value.
 *
 * @return {Any} The value found at the end of the specified key path.
 */
export function getPath<D, P extends Key[]>(dictionary: D, path: P): Any {
  const result = path.reduce((prevObj, key) => prevObj && prevObj[key], dictionary)
  return result as Any
}
