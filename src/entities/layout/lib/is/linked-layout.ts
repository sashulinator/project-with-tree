import { has } from '~/utils/core'

import { LinkedLayoutItem } from '../../types/linked-layout-item'

export function isLinkedLayout(val: unknown): val is LinkedLayoutItem {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return has(val, 'linkedId')
}
