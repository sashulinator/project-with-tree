import { has } from '~/utils/core'

import { LinkedNode } from '../../types/linked-node'

export function isLinkedNode(val: unknown): val is LinkedNode {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return has(val, 'linkedId')
}
