import { Emitter, Prop } from '~/utils/emitter'

import { Decision } from '../../..'

export type ManagerEvents = {
  name: { value: string }
}

export class Manager extends Emitter<ManagerEvents> {
  decision: Decision

  name: Prop<'name', string>

  constructor(decision: Decision) {
    super()

    this.decision = decision

    this.name = new Prop('name', decision.name, this)
  }
}
