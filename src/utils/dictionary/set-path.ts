import { Key } from '../core'
import { Dictionary } from './types/dictionary'

/**
 * Sets a value to a specific path within a nested dictionary object.
 *
 * @param {Dictionary<unknown>} dictionary - The dictionary object.
 * @param {Key[]} path - An array of keys to traverse in the dictionary object to reach the desired location for the new value.
 * @param {unknown} value - The new value to be set at the specified path.
 *
 * @returns {Dictionary<unknown>} - The original dictionary object with the new value set at the specified path.
 */
export function setPath<D extends Dictionary<unknown>>(dictionary: D, path: Key[], value: unknown): D {
  return path.reduce((acc: any, key, i) => {
    if (acc[key] === undefined) acc[key] = {}
    if (i === path.length - 1) acc[key] = value
    return acc[key]
  }, dictionary)
}
