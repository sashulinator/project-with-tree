import { Key, has, isInteger, isNull, isUndefined } from '../core'
import { Dictionary } from './types/dictionary'

/**
 * Sets a value to a specific path within a nested dictionary object.
 *
 * @param {Dictionary<unknown>} obj - The dictionary object.
 * @param {Key[]} path - An array of keys to traverse in the dictionary object to reach the desired location for the new value.
 * @param {unknown} val - The new value to be set at the specified path.
 *
 * @returns {Dictionary<unknown>} - The original dictionary object with the new value set at the specified path.
 */
export function setPath<D extends Dictionary<unknown> | unknown[]>(path: Key[], val: unknown, obj: D): D {
  if (path.length === 0) {
    // @ts-ignore
    return val
  }
  var idx = path[0]
  if (path.length > 1) {
    var nextObj =
      // @ts-ignore
      obj != null && Object.prototype.hasOwnProperty.call(obj, idx) && typeof obj[idx] === 'object'
        ? obj[idx]
        : isInteger(path[1])
        ? []
        : {}
    val = setPath(Array.prototype.slice.call(path, 1), val, nextObj)
  }
  // @ts-ignore
  return _assoc(idx, val, obj)
}

export default function _assoc(prop: any, val: any, obj: any) {
  if (Number.isInteger(prop) && _isArray(obj)) {
    // @ts-ignore
    var arr = [].concat(obj)
    // @ts-ignore
    arr[prop] = val
    return arr
  }

  var result = {}
  for (var p in obj) {
    result[p] = obj[p]
  }
  result[prop] = val
  return result
}

function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]'
}
