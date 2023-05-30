import { Any } from '../core'
import { Emitter } from './types/emitter'
import { Emitterable } from './types/emitterable'

export class EmitterableProp<
  TEventName extends string,
  TValue,
  TEmitterable extends Emitterable<Emitter<Any>> = Emitterable<Emitter<Any>>
> {
  emitterable: TEmitterable

  eventName: TEventName

  initialValue: TValue

  previousValue: TValue

  private _value: TValue

  constructor(eventName: TEventName, value: TValue, emitterable: TEmitterable) {
    this._value = value
    this.initialValue = value
    this.previousValue = value
    this.emitterable = emitterable
    this.eventName = eventName

    this.emitterable.emitter.on(this.eventName, ({ value }) => {
      this.previousValue = this._value
      this._value = value
    })
  }

  get value(): TValue {
    return this._value
  }

  set value(value: TValue) {
    this.emitterable.emitter.emit(this.eventName, { value })
  }

  set = (value: TValue, event?: Record<string, unknown> | undefined): void => {
    this.emitterable.emitter.emit(this.eventName, { value, ...event })
  }
}
