import { EventType } from 'mitt'

import { EmittableState } from './emittable-state'

export class EmittableProp<V, E extends Record<EventType, unknown>> {
  private _value: V

  private emittableState: EmittableState<E>

  private eventName: string

  constructor(value: V, eventName: string, state: EmittableState<E>) {
    this._value = value

    this.emittableState = state

    this.eventName = eventName
  }

  get value(): V {
    return this._value
  }

  set value(value: V) {
    this._value = value
    this.emittableState.mitt.emit(this.eventName, { value } as any)
  }
}
