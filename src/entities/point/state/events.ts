import { Rule } from '~/entities/rule'

import { ItemEvents } from '../../../widgets/canvas/ui/item'

export type Events = ItemEvents & {
  setRuleList: { link: Rule }
}
