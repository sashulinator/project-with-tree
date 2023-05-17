import { Any } from '../core'

export interface BaseEmittableState {
  emitter: {
    emit: (eventName: string, event: unknown) => void
    on: (eventName: string, fn: (event: Any) => unknown) => void
  }
}

export class EmittableProp<N extends string, V> {
  private _value: V

  initialValue: V

  private emittableState: BaseEmittableState

  private eventName: N

  constructor(eventName: N, value: V, state: BaseEmittableState) {
    this._value = value
    this.initialValue = value
    this.emittableState = state
    this.eventName = eventName

    state.emitter.on(eventName, (event) => {
      this._value = event.value
    })
  }

  get value(): V {
    return this._value
  }

  set value(value: V) {
    this.emittableState.emitter.emit(this.eventName, { value })
  }
}
