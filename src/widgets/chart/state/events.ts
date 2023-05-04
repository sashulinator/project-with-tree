import { Any } from '@react-spring/types'

import { Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

import { EventNames } from './event-names'
import { Translate } from './state'

export type Events<S> = {
  [EventNames.setScale]: { scale: number }
  [EventNames.setTranslate]: { translate: Translate }
  [EventNames.setItemStates]: { itemStates: Record<Id, S> }
  [EventNames.select]: { ids: Id[] }
  [EventNames.setItemState]: { id: Id; eventName: string; event: Dictionary<Any> }
}
