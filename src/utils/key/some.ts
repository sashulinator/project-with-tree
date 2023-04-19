import { Key } from './types/key'

export function some(listA: Key[], listB: Key[]): boolean {
  return listA.some((childId) => listB.includes(childId))
}
