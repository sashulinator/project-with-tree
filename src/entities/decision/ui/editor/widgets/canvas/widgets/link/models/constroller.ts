import { Id, generateId } from '~/utils/core'
import { Emitter, Prop } from '~/utils/emitter'

import { Rule, RuleSet } from '../../../../../../../'

export type Events = {
  targetId: { value: Id }
  sourceId: { value: Id }
  index: { value: number }
}

interface Serialized {
  id: Id
  rules: Rule[]
  targetId: Id | undefined
  sourceId: Id | undefined
  index: number
}

export interface Props {
  id?: Id | undefined
  sourceId?: Id | undefined
  targetId?: Id | undefined
  rules?: Rule[] | undefined
  index: number
}

export class Controller extends Emitter<Events> {
  id: Id

  rules: Prop<'rules', Rule[]>

  targetId: Prop<'targetId', Id | undefined>

  sourceId: Prop<'sourceId', Id | undefined>

  index: Prop<'index', number>

  constructor(props: Props) {
    super()

    this.id = props.id || generateId()

    this.rules = new Prop('rules', props.rules || [], this)

    this.targetId = new Prop('targetId', props.targetId, this)

    this.sourceId = new Prop('sourceId', props.sourceId, this)

    this.index = new Prop('index', props.index, this)
  }

  serialize(): Serialized {
    return {
      id: this.id,
      targetId: this.targetId.value,
      sourceId: this.sourceId.value,
      rules: this.rules.value,
      index: this.index.value,
    }
  }

  toRuleSet(): RuleSet {
    return {
      id: this.targetId.value,
      rules: this.rules.value,
      index: this.index.value,
    }
  }
}
