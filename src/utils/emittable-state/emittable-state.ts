import mitt, { Emitter, EventType } from 'mitt'

export abstract class EmittableState<Events extends Record<EventType, unknown>> {
  mitt: Emitter<Events>

  constructor() {
    this.mitt = mitt()
  }
}
