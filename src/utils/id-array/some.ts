import { Id } from '../core'

export function some(listA: Id[], listB: Id[]): boolean {
  return listA.some((id) => listB.includes(id))
}
