import { EventType } from 'mitt'

interface EmittableState {
  emitter: {
    emit: (eventName: string, event: unknown) => void
  }
}

export class EmittableProp<N extends string, V> {
  private _value: V

  private emittableState: EmittableState

  private eventName: N

  constructor(eventName: N, value: V, state: EmittableState) {
    this._value = value

    this.emittableState = state

    this.eventName = eventName
  }

  get value(): V {
    return this._value
  }

  set value(value: V) {
    this._value = value
    this.emittableState.emitter.emit(this.eventName, { value })
  }
}
