import { Rule } from '~/entities/rule'
import { Id, assertDefined } from '~/utils/core'
import { EmitterableProp } from '~/utils/emitterable'

import { Link } from '../types/link'

export class EditingLinkProp<N extends string> extends EmitterableProp<N, Link | null> {
  add = (editingLink: Link): void => {
    this.value = editingLink
  }

  finish = (pointId: Id): void => {
    assertDefined(this.value?.rule)
    const rule: Rule = { ...this.value.rule, pointId }
    this.value?.sourceState?.ruleList.update(rule)
    this.value = null
  }
}
