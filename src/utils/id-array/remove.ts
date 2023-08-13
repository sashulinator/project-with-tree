import { Id } from '../core'
import { remove as removeIndex } from '../list'

export function remove(id: Id, arr: Id[]): Id[] {
  const index = arr.findIndex((iId) => iId === id)
  return removeIndex(index, arr)
}
