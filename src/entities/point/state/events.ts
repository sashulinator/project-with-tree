import { Rule } from '~/entities/rule'

import { Position } from '../../../widgets/canvas/types/position'

export type Events = {
  setPosition: { value: Position }
  setRef: { element: HTMLElement }
  setWidth: { width: number }
  setHeight: { value: number }
  setRuleList: { link: Rule }
}
