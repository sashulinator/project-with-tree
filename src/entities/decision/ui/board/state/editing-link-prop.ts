/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Rule } from '~/entities/rule'
import { Id, assertDefined } from '~/utils/core'
import { EmitterableProp } from '~/utils/emitter'

export class EditingLinkProp<N extends string> extends EmitterableProp<N, any | null> {
  add = (editingLink: any): void => {
    this.value = editingLink
  }

  finish = (pointId: Id): void => {
    assertDefined(this.value?.rule)
    const rule: Rule = { ...this.value.rule, pointId }
    this.value?.sourceState?.ruleList.update(rule)
    this.value = null
  }
}
