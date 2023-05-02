import { EventNames } from './event-names'
import { Translate } from './state'

export type Events = {
  [EventNames.setScale]: { scale: number }
  [EventNames.setTranslate]: { translate: Translate }
}
