import { Dictionary } from '../dictionary'
import { Emitter } from './types/emitter'

export type PropEvent<TEventName extends string, TValue> = Record<TEventName, { value: TValue }>

export type PropEmitter<TEvents extends Dictionary<unknown>> = Pick<Emitter<TEvents>, 'on' | 'emit'>

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
export class Prop<
  TEventName extends string,
  TValue,
  TEmitter extends PropEmitter<TEvent>,
  TEvent extends PropEvent<TEventName, TValue> = PropEvent<TEventName, TValue>,
> {
  /**
   * Текущее значение
   */
  private _value: TValue

  /**
   * Имя ивента которое мы будем вызывать при изменении значения value
   */
  eventName: TEventName

  /**
   * Emitter
   */
  emitter: TEmitter

  constructor(eventName: TEventName, value: TValue, emitter: TEmitter) {
    this.emitter = emitter

    this.eventName = eventName

    this._value = value

    this.emitter.on(this.eventName, (ev) => (this._value = ev.value))
  }

  get value(): TValue {
    return this._value
  }

  set value(value: TValue) {
    this.emitter.emit(this.eventName, { value } as any)
  }

  set = (value: TValue, ev?: Record<string, unknown> | undefined): void => {
    this.emitter.emit(this.eventName, { value, ...ev } as any)
  }

  setSilently_DANGEROUS = (value: TValue) => {
    this._value = value
  }
}
