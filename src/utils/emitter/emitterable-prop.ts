import { Any } from '../core'
import { Emitter } from './types/emitter'
import { Emitterable } from './types/emitterable'

/**
 * Пропс для Emitterable
 * 1. Подписывается на вызов события по изменению value
 * 2. Вызывает событие при изменении value
 *
 * @template TEventName Имя ивента которое закреплено за пропсом в Emitterable
 * @template TValue Принимаемое значение
 * @template TValue Emitterable у которого мы будем дергать Emitter
 */
export class EmitterableProp<
  TEventName extends string,
  TValue,
  TEmitterable extends Emitterable<Emitter<Any>> = Emitterable<Emitter<Any>>
> {
  /**
   * Emitterable у которого мы будем дергать Emitter
   */
  emitterable: TEmitterable

  /**
   * Имя ивента которое закреплено за пропсом в Emitterable
   */
  eventName: TEventName

  /**
   * Значение при инициализации
   */
  initialValue: TValue

  /**
   * Предыдущее значение
   */
  previousValue: TValue

  /**
   * Текущее значение
   */
  private _value: TValue

  constructor(eventName: TEventName, value: TValue, emitterable: TEmitterable) {
    this.emitterable = emitterable

    this.eventName = eventName

    this.initialValue = value

    this.previousValue = value

    this._value = value

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
