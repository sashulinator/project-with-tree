import { Any } from '@react-spring/types'

import { Link } from '~/entities/point'
import { Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'
import { Translate } from '~/widgets/canvas'
import { PointState, Position } from '~/widgets/chart-item'

export type Events = {
  setScale: { value: number }
  setTranslate: { value: Translate }
  setSelected: { value: Id[] }
  setLinks: { value: Link[] }
  setItemStates: { value: Record<Id, PointState> }
  setPosition: { position: Position; pointStateId: Id }
  setItemState: { id: Id; eventName: string; event: Dictionary<Any> }
}
