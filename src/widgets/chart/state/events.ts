import { Any } from '@react-spring/types'

import { Link } from '~/entities/point'
import { Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

import { EventNames } from './event-names'
import { Translate } from './state'

export type Events<S> = {
  [EventNames.setScale]: { value: number }
  [EventNames.setTranslate]: { value: Translate }
  [EventNames.setSelected]: { value: Id[] }
  [EventNames.setLinks]: { value: Link[] }
  [EventNames.setItemStates]: { value: Record<Id, S> }
  [EventNames.setItemState]: { id: Id; eventName: string; event: Dictionary<Any> }
}
