import { Link } from '~/entities/point'

import { Position } from '../../../widgets/chart-item/types/position'

export type Events = {
  setPosition: { value: Position }
  setRef: { element: HTMLElement }
  setWidth: { width: number }
  setHeight: { height: number }
  addLink: { link: Link }
}
