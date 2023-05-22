import { Link } from '~/entities/point'

import { Position } from '../../../widgets/chart-item/types/position'
import { EventNames } from './event-names'

export type Events = {
  [EventNames.setPosition]: { position: Position }
  [EventNames.setRef]: { element: HTMLElement }
  [EventNames.setWidth]: { width: number }
  [EventNames.setHeight]: { height: number }
  [EventNames.addLink]: { link: Link }
}
