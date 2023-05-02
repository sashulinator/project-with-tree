import mitt, { Emitter, EventType } from 'mitt'

export abstract class EmittableState<D, Events extends Record<EventType, unknown>> {
  mitt: Emitter<Events>
  data: D

  constructor(data: D) {
    this.mitt = mitt()
    this.data = data
  }
}
