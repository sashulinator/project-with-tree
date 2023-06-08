import { Rule } from '~/entities/rule'

import { ItemEvents } from '../../../../../abstract/canvas/ui/item'

export type Events = ItemEvents & {
  setRuleList: { link: Rule }
}
