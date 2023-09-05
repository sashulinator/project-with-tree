import { Emitter, Prop } from '~/utils/emitter'

import { Decision } from '..'

export type Events = {
  name: { value: string }
}

export class Controller extends Emitter<Events> {
  decision: Decision

  name: Prop<'name', string>

  constructor(decision: Decision) {
    super()

    this.decision = decision

    this.name = new Prop('name', decision.name, this)
  }
}
