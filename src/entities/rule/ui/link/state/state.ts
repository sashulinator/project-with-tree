import uuid from 'uuid-random'

import { Rule } from '~/entities/rule/types/rule'
import { Emitter } from '~/lib/emitter'
import { Id } from '~/utils/core'
import { Prop } from '~/utils/emitter'

import { LinkEvents } from './events'

export interface LinkStateProps {
  id: Id
  rule: Rule
}

export class LinkState extends Emitter<LinkEvents> {
  id: Id

  rule: Prop<'rule', Rule>
  constructor(props: LinkStateProps) {
    super()

    this.id = props.id

    this.rule = new Prop('rule', props.rule, this)
  }

  static createDefaultRule(rule: Partial<Rule>): Rule {
    return {
      id: uuid(),
      name: 'new_rule',
      ...rule,
    }
  }

  static createDefaultInstance(rule: Partial<Rule>): LinkState {
    const newRule = LinkState.createDefaultRule(rule)
    return new LinkState({ id: newRule.id, rule: newRule })
  }
}
