import { Any } from '../core'
import { Emitterable } from './types/emitterable'

export class EmitterableProp<N extends string, V> {
  private _value: V

  initialValue: V

  previousValue: V

  emittableState: Emitterable<Any>

  eventName: N

  constructor(eventName: N, value: V, state: Emitterable<Any>) {
    this._value = value
    this.initialValue = value
    this.previousValue = value
    this.emittableState = state
    this.eventName = eventName

    this.emittableState.emitter.on(this.eventName, ({ value }) => {
      this.previousValue = this._value
      this._value = value
    })
  }

  get value(): V {
    return this._value
  }

  set value(value: V) {
    this.emittableState.emitter.emit(this.eventName, { value })
  }

  set = (value: V, event?: Record<string, unknown> | undefined): void => {
    this.emittableState.emitter.emit(this.eventName, { value, ...event })
  }
}
