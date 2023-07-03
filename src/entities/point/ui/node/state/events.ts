import { Point } from '~/entities/decision'

import { ItemEvents } from '../../../../../abstract/canvas/widgets/item'

export type Events = ItemEvents & {
  computation: { value: Point['computation'] }
  title: { value: string }
}
