import { Dictionary } from '../dictionary'
import { Emitter } from './emitter'
import { EmitterMap } from './types/emitter-map'
import { EventName } from './types/event-name'
import { Events } from './types/events'

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
