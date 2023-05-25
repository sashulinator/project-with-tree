import { Any } from '@react-spring/types'

import { Rule } from '~/entities/rule'
import { Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'
import { Translate } from '~/widgets/canvas'
import { PointState, Position } from '~/widgets/chart-item'

export type Events = {
  setScale: { value: number }
  setPaintingPanelRef: { element: SVGGElement }
  setTranslate: { value: Translate }
  setSelected: { value: Id[] }
  setRuleList: { value: Rule[] }
  setItemStates: { value: Record<Id, PointState> }
  setPosition: { pointStateId: Id; value: Position; isLast: boolean }
  setItemState: { id: Id; eventName: string; event: Dictionary<Any> }
}
