import { Point } from '~/entities/decision'

import { ItemEvents } from '../../../../../abstract/canvas/ui/item'

export type Events = ItemEvents & {
  computation: { value: Point['computation'] }
  title: { value: string }
}
