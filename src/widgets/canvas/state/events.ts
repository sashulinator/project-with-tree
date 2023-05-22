import { Translate } from '../types/translate'
import { EventNames } from './event-names'

export type Events = {
  [EventNames.setScale]: { value: number }
  [EventNames.setTranslate]: { value: Translate }
}
