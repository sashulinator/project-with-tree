import { Any } from '../core'
import { Emitter } from './types/emitter'

/**
 * @final
 * Пропс для Emitterable
 * 1. Подписывается на вызов события по изменению value
 * 2. Вызывает событие при изменении value
 *
 * @template TEventName Имя ивента которое мы будем вызывать при изменении значения value
 * @template TValue Принимаемое значение
 * @template TEmitter Emitter
 */
export class Prop<TEventName extends string, TValue, TEmitter extends Emitter<Any> = Emitter<Any>> {
  /**
   * Emitter
   */
  emitter: TEmitter

  /**
   * Имя ивента которое мы будем вызывать при изменении значения value
   */
  eventName: TEventName

  /**
   * Текущее значение
   */
  private _value: TValue

  constructor(eventName: TEventName, value: TValue, emitter: TEmitter) {
    this.emitter = emitter

    this.eventName = eventName

    this._value = value

    this.emitter.on(this.eventName, (ev) => {
      this._value = ev.value
    })
  }

  get value(): TValue {
    return this._value
  }

  set value(value: TValue) {
    this.emitter.emit(this.eventName, { value, previous: this._value })
  }

  set = (value: TValue, ev?: Record<string, unknown> | undefined): void => {
    this.emitter.emit(this.eventName, { value, previous: this._value, ...ev })
  }

  setSilently_DANGEROUS = (value: TValue) => {
    this._value = value
  }
}
