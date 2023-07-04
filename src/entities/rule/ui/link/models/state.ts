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

  readonly rule: Rule

  targetId: Prop<'targetId', Id | undefined>

  sourceId: Prop<'sourceId', Id | undefined>

  constructor(props: StateProps) {
    super()

    this.id = props.id

    this.rule = props.rule

    this.targetId = new Prop('targetId', props.rule.targetId, this)

    this.sourceId = new Prop('sourceId', props.rule.sourceId, this)
  }

  static createDefaultRule(rule: Partial<Rule>): Rule {
    return {
      id: uuid(),
      name: 'new_rule',
      i: 0,
      ...rule,
    }
  }

  static createDefaultInstance(rule: Partial<Rule>): State {
    const newRule = State.createDefaultRule(rule)
    return new State({ id: newRule.id, rule: newRule })
  }
}
