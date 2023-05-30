import { Rule } from '~/entities/rule'

import { CanvasItemEvents } from '../../../widgets/canvas/ui/item'

export type Events = CanvasItemEvents & {
  setRuleList: { link: Rule }
}
