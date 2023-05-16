import createEmitter, { Emitter, EventType } from 'mitt'

export abstract class EmittableState<Events extends Record<EventType, unknown>> {
  emitter: Emitter<Events>

  constructor() {
    this.emitter = createEmitter()
  }
}
