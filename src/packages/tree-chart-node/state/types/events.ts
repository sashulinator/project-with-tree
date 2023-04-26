import { EventNames } from './event-names'
import { Position } from './state'

export type Events = {
  [EventNames.setPosition]: { position: Position }
}
