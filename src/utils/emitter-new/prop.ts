import { Dictionary } from '../dictionary'
import { Emitter } from './emitter'

export class Prop<TValue, Event extends Dictionary<unknown> | void = void> extends Emitter<{ value: TValue }> {
  private _value: TValue

  constructor(value: TValue) {
    super()
    this._value = value
  }

  get value(): TValue {
    return this._value
  }

  set = (value: TValue, event: Event) => {
    this._value = value
    this.emit({ value, ...event })
  }
}
