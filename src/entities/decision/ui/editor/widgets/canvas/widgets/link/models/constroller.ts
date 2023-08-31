import { Id, generateId } from '~/utils/core'
import { Emitter, Prop } from '~/utils/emitter'

import { Rule, RuleSet } from '../../../../../../../'

export type Events = {
  targetId: { value: Id }
  sourceId: { value: Id }
  index: { value: number }
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

  deserialize(): RuleSet {
    return {
      rules: this.rules.value,
      id: this.targetId.value,
      index: this.index.value,
    }
  }
}
