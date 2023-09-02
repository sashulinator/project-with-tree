import { Id } from '../core'
import { push } from '../list/push'
import { remove } from './remove'

export function toggle(id: Id, list: Id[]): Id[] {
  if (list.includes(id)) {
    return remove(id, list)
  } else {
    return push(id, list)
  }
}
