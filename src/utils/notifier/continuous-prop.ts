import { Prop } from './prop'

type ContnuousPropEvent = { isLast: boolean }

/**
 * @class ContnuousProp
 * @private @property {TValue} _lastValue Stores last value
 */
export class ContinuousProp<TValue, TEvent extends ContnuousPropEvent = ContnuousPropEvent> extends Prop<
  TValue,
  TEvent
> {
  private _lastValue: TValue

  /**
   * @constructor
   * @param {TValue} value
   */
  constructor(value: TValue) {
    super(value)
    this._lastValue = value
  }

  /**
   * @get
   * @returns {TValue}
   */
  get lastValue(): TValue {
    return this._lastValue
  }

  /**
   * Sets value with event
   * @param {TValue} value
   * @param {TEvent} event
   */
  set = (value: TValue, event: TEvent) => {
    super.set(value, event)
    if (event.isLast) this._lastValue = value
    this.notify({ value, ...event })
  }
}
