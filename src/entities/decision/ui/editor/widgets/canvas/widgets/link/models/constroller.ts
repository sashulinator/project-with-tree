import { LinkController as UiController, LinkEvents as UiEvents } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { Prop } from '~/utils/emitter'

import { Link as PointLink } from '../../../../../../../types/point'
import { Rule } from '../../../../../../../types/rule'

export type Events = UiEvents & {
  index: { value: number }
}

export interface Serialized {
  id: Id
  targetId: Id | undefined
  sourceId: Id | undefined
  index: number
  rules: Rule[]
}

export interface Props {
  id?: Id | undefined
  sourceId?: Id | undefined
  targetId?: Id | undefined
  index?: number | undefined
  rules?: Rule[] | undefined
}

export class Controller extends UiController<Events> {
  rules: Prop<'rules', Rule[]>

  index: Prop<'index', number>

  constructor(props: Props) {
    super({ sourceId: props.sourceId, targetId: props.targetId, id: props.id })

    this.index = new Prop('index', props.index ?? 0, this)

    this.rules = new Prop('rules', props.rules ?? [], this)
  }

  static fromLink = (pointLink: PointLink, sourceId: Id): Controller => {
    return new Controller({
      sourceId,
      targetId: pointLink.id,
      rules: pointLink.rules,
      index: pointLink.index,
    })
  }

  serialize(): Serialized {
    return {
      id: this.id,
      targetId: this.targetId.value,
      sourceId: this.sourceId.value,
      index: this.index.value,
      rules: this.rules.value,
    }
  }

  toLink(): PointLink {
    return {
      id: this.targetId.value,
      index: this.index.value,
      rules: this.rules.value,
    }
  }
}
