import { Id } from '~/utils/core'

import { EventNames } from './event-names'
import { Translate } from './state'

export type Events<S> = {
  [EventNames.setScale]: { scale: number }
  [EventNames.setTranslate]: { translate: Translate }
  [EventNames.addItem]: { id: Id; state: S }
  [EventNames.select]: { ids: Id[] }
  [EventNames.unselect]: { ids: Id[] }
  [EventNames.selectToggle]: { id: Id }
}
