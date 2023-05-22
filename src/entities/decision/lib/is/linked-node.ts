import { has } from '~/utils/core'

import { LinkedDecision } from '../../types/linked-item'

export function isLinkedNode(val: unknown): val is LinkedDecision {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return has(val, 'linkedId')
}
