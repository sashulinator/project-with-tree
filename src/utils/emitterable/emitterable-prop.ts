import { Any } from '../core'
import { Emitterable } from './types/emitterable'

export class EmitterableProp<N extends string, V> {
  private _value: V

  initialValue: V

  previousValue: V

  private emittableState: Emitterable<Any>

  private eventName: N

  constructor(eventName: N, value: V, state: Emitterable<Any>) {
    this._value = value
    this.initialValue = value
    this.previousValue = value
    this.emittableState = state
    this.eventName = eventName
  }

  get value(): V {
    return this._value
  }

  set value(value: V) {
    this.previousValue = this._value
    this._value = value
    this.emittableState.emitter.emit(this.eventName, { value })
  }
}
