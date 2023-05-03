import { Position } from '~/packages/tree-chart-item'
import { Id } from '~/utils/core'

import { EventNames } from './event-names'
import { Translate } from './state'

export type Events<S> = {
  [EventNames.setScale]: { scale: number }
  [EventNames.setTranslate]: { translate: Translate }
  [EventNames.setItemStates]: { itemStates: Record<Id, S> }
  [EventNames.select]: { ids: Id[] }
  [EventNames.setItemPosition]: { id: Id; position: Position }
}
