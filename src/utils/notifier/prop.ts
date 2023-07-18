import { Dictionary } from '../dictionary'
import { Notifier } from './notifier'

export class Prop<TValue, Event extends Dictionary<unknown> | void = void> extends Notifier<{ value: TValue }> {
  private _value: TValue

  constructor(value: TValue) {
    super()
    this._value = value
  }

  get value(): TValue {
    return this._value
  }

  /**
   * Sets value with event
   * @param {TValue} value
   * @param {TEvent} event
   */
  set = (value: TValue, event: Event) => {
    this._value = value
    this.notify({ value, ...event })
  }
}
