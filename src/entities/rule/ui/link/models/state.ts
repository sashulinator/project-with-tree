import uuid from 'uuid-random'

import { Emitter } from '~/lib/emitter'
import { Id } from '~/utils/core'
import { Prop } from '~/utils/emitter'

import { Rule } from '../../../types/rule'

export type Events = {
  rule: { value: Rule }
}

export interface StateProps {
  id: Id
  rule: Rule
}

export class State extends Emitter<Events> {
  id: Id

  rule: Prop<'rule', Rule>
  constructor(props: StateProps) {
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

  static createDefaultInstance(rule: Partial<Rule>): State {
    const newRule = State.createDefaultRule(rule)
    return new State({ id: newRule.id, rule: newRule })
  }
}
