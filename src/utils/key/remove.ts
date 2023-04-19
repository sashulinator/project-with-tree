import { remove as removeIndex } from '../list'
import { Key } from './types/key'

export function remove(key: Key, arr: Key[]): Key[] {
  const index = arr.findIndex((arrKey) => arrKey === key)
  return removeIndex(index, arr)
}
