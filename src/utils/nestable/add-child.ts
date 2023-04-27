import { add } from '../list'
import { Nestable } from './types/nestable'

export function addChild<N extends Nestable>(parent: N, index: number | undefined, childId: string | number): N {
  const children = parent.children ?? []
  const toIndex = index ?? children.length

  return { ...parent, children: add(toIndex, childId, children) }
}
