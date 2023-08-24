import { Rule, RuleSet } from '~/entities/point'
import { Emitter } from '~/lib/emitter'
import { Id, generateId } from '~/utils/core'
import { Prop } from '~/utils/depricated-emitter'

export type Events = {
  targetId: { value: Id }
  sourceId: { value: Id }
  index: { value: number }
}

export interface StateProps {
  id?: Id | undefined
  sourceId?: Id | undefined
  targetId?: Id | undefined
  rules?: Rule[] | undefined
  index: number
}

export class State extends Emitter<Events> {
  id: Id

  readonly rules: Rule[]

  targetId: Prop<'targetId', Id | undefined>

  sourceId: Prop<'sourceId', Id | undefined>

  index: Prop<'index', number>

  constructor(props: StateProps) {
    super()

    this.id = props.id || generateId()

    this.rules = props.rules || []

    this.targetId = new Prop('targetId', props.targetId, this)

    this.sourceId = new Prop('sourceId', props.sourceId, this)

    this.index = new Prop('index', props.index, this)
  }

  static createDefaultInstance(partialProps: Partial<StateProps>): State {
    return new State({
      index: 0,
      ...partialProps,
    })
  }

  deserialize(): RuleSet {
    return {
      rules: this.rules,
      id: this.targetId.value,
      index: this.index.value,
    }
  }
}
