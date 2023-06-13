import { Emitter } from '~/lib/emitter'
import { Id } from '~/utils/core'
import { AnyEvent } from '~/utils/emitter'

import { LinkEvents } from './events'

export interface LinkStateProps {
  id: Id
}

export class LinkState<TEvents extends AnyEvent> extends Emitter<TEvents & LinkEvents> {
  id: Id
  constructor(props: LinkStateProps) {
    super()

    this.id = props.id
  }
}
