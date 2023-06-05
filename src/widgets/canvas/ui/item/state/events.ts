import { typeTest } from '~/utils/core'

import { Position } from '../../../types/position'
import { ItemEventNames } from './event-names'

export type ItemEvents = {
  setPosition: { value: Position }
  setRef: { value: HTMLElement }
  setWidth: { value: number }
  setHeight: { value: number }
}

typeTest<keyof ItemEvents>('' as ItemEventNames)
typeTest<ItemEventNames>('' as keyof ItemEvents)
