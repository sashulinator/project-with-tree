import { Id, generateId } from '~/utils/core'
import { Emitter, Prop } from '~/utils/emitter'

export type Events = {
  targetId: { value: Id }
  sourceId: { value: Id }
}

export interface Props {
  sourceId: Id | undefined
  targetId: Id | undefined
}

export class Controller<E extends Events> extends Emitter<E> {
  id: Id

  targetId: Prop<'targetId', Id | undefined>

  sourceId: Prop<'sourceId', Id | undefined>

  constructor(props: Props) {
    super()

    this.id = generateId()

    this.sourceId = new Prop('sourceId', props.sourceId, this)

    this.targetId = new Prop('targetId', props.sourceId, this)
  }
}
