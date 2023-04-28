import { has } from '~/utils/core'

import { LinkedItem } from '../../types/linked-item'

export function isLinkedNode(val: unknown): val is LinkedItem {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return has(val, 'linkedId')
}
