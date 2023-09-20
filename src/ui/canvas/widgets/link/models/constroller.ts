import { Id, generateId } from '~/utils/core'
import { Emitter, Prop } from '~/utils/emitter'

export type Events = {
  targetId: { value: Id }
  sourceId: { value: Id }
}

export interface Props {
  id?: Id | undefined
  sourceId: Id | undefined
  targetId: Id | undefined
}

export class Controller<E extends Events> extends Emitter<E> {
  id: Id

  targetId: Prop<'targetId', Id | undefined>

  sourceId: Prop<'sourceId', Id | undefined>

  constructor(props: Props) {
    if (!props.sourceId && !props.targetId) throw new Error('`sourceId` or `targetId` must be passed.')

    super()

    this.id = props.id || generateId()

    this.sourceId = new Prop('sourceId', props.sourceId, this)

    this.targetId = new Prop('targetId', props.targetId, this)
  }
}
