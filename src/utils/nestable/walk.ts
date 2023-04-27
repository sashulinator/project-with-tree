import { Id } from '../core'
import { Dictionary } from '../dictionary'
import { Nestable } from './types/nestable'

/**
 * Represents the result of traversing a dictionary object or any other collection.
 *
 * @template T - The value type of the collection being traversed.
 */
export interface TraversalResult<T> {
  /**
   * Id
   */
  id: Id

  /**
   * An array of keys representing the path to the current value in the collection being traversed.
   */
  path?: Id[]

  /**
   * The parent dictionary object of the current value in the collection being traversed.
   */
  parent?: T

  /**
   * Tree.
   */
  tree: Dictionary<T>

  /**
   * Tree.
   */
  item: T

  /**
   * Depth
   */
  depth: number
}

export function walk<N extends Nestable>(
  item: N,
  tree: Dictionary<N>,
  cb: (ret: TraversalResult<N>) => void | boolean,
  parent?: N | undefined,
  path?: Id[],
  depth = 0
) {
  path = path ?? [item.id]

  if (cb({ id: item.id, item, parent, path, tree, depth } as any) || !item.children) {
    return
  }

  for (let index = 0; index < item.children.length; index++) {
    const id = item.children?.[index] as Id
    const child = tree[id]

    if (child === undefined) {
      throw new Error('Entity does not exists')
    }

    walk(child, tree, cb, item, [...path, child.id], index)
  }
}
