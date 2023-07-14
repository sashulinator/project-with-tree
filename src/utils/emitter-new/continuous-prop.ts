import { Prop } from './prop'
import { EmitterMap } from './types/emitter-map'
import { Events } from './types/events'

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
    this.emit({ value, ...event })
  }

  /**
   * Links `listeners` from `Prop` to `EmitterMap`
   * @param name
   * @param emitterMap Dictionary with Emitters
   * @returns {this}
   */
  link = <TEvents extends Events>(name: keyof TEvents, emitterMap: EmitterMap<TEvents>): this => {
    ;(emitterMap as any)[name] = this.listeners
    return this
  }
}
