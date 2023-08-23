import uniqid from 'uniqid'

import { RuleSet } from '~/entities/point'
import { Emitter } from '~/lib/emitter'
import { Id } from '~/utils/core'
import { Prop } from '~/utils/depricated-emitter'

export type Events = {
  targetId: { value: Id }
  sourceId: { value: Id }
  index: { value: number }
}

export interface StateProps {
  pointId: Id
  ruleSet: RuleSet
}

export class State extends Emitter<Events> {
  id: Id

  readonly ruleSet: RuleSet

  targetId: Prop<'targetId', Id | undefined>

  sourceId: Prop<'sourceId', Id | undefined>

  index: Prop<'index', number>

  constructor(props: StateProps) {
    super()

    this.id = uniqid()

    this.ruleSet = props.ruleSet

    this.targetId = new Prop('targetId', props.ruleSet.id, this)

    this.sourceId = new Prop('sourceId', props.pointId as Id | undefined, this)

    this.index = new Prop('index', props.ruleSet.index, this)
  }

  static createDefaultRuleSet(ruleSet: Partial<RuleSet>): RuleSet {
    return {
      id: uniqid(),
      ...ruleSet,
      index: 0,
      rules: [],
    }
  }

  static createDefaultInstance(pointId: Id, partialRuleSet: Partial<RuleSet>): State {
    const ruleSet = State.createDefaultRuleSet(partialRuleSet)
    return new State({ pointId, ruleSet })
  }

  deserialize(): RuleSet {
    return {
      ...this.ruleSet,
      id: this.targetId.value,
      index: this.index.value,
    }
  }
}
