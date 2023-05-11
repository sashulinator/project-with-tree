import { Position } from '../types/position'
import { EventNames } from './event-names'

export type Events = {
  [EventNames.setPosition]: { position: Position }
  [EventNames.setRef]: { element: HTMLElement }
}
