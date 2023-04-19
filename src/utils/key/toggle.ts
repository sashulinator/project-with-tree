import { push } from '../list/push'
import { remove } from './remove'
import { Key } from './types/key'

export function toggle(key: Key, list: Key[]) {
  if (list.includes(key)) {
    return remove(key, list)
  } else {
    return push(key, list)
  }
}
