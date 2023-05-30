import { Any } from '../core'
import { Emitter } from './types/emitter'
import { Emitterable } from './types/emitterable'

export class EmitterableProp<
  TEventName extends string,
  TValue,
  TEmitterable extends Emitterable<Emitter<Any>> = Emitterable<Emitter<Any>>
> {
  private _value: TValue

  initialValue: TValue

  previousValue: TValue

  emittableState: TEmitterable

  eventName: TEventName

  constructor(eventName: TEventName, value: TValue, state: TEmitterable) {
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

  get value(): TValue {
    return this._value
  }

  set value(value: TValue) {
    this.emittableState.emitter.emit(this.eventName, { value })
  }

  set = (value: TValue, event?: Record<string, unknown> | undefined): void => {
    this.emittableState.emitter.emit(this.eventName, { value, ...event })
  }
}
