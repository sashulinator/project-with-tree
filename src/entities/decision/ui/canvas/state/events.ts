import { Any } from '@react-spring/types'

import { PointState } from '~/entities/point'
import { Rule } from '~/entities/rule'
import { Id } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'
import { Position, Translate } from '~/widgets/canvas'

import { Link } from '../types/link'

export type Events = {
  setScale: { value: number }
  setPaintingPanelRef: { element: SVGGElement }
  setCanvasBoardRef: { element: SVGSVGElement }
  setTranslate: { value: Translate }
  setSelected: { value: Id[] }
  setRuleList: { value: Rule[] }
  setItemStates: { value: Record<Id, PointState> }
  setPosition: { pointStateId: Id; value: Position; isLast: boolean }
  setItemState: { id: Id; eventName: string; event: Dictionary<Any> }
  setEditingLink: { value: Link }
}
