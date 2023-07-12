import { Prop, PropEmitter } from './prop'

export type СontinuousPropEvent<TEventName extends string, TValue> = Record<
  TEventName,
  { value: TValue; isLast: boolean }
>

/**
 * @final
 *
 * Stores values for continuous actions, for instance `dragging`.
 *
 * @template TEventName - Тип имени события
 * @template TValue - Тип значение
 */
export class СontinuousProp<
  TEventName extends string,
  TValue,
  TEmitter extends PropEmitter<TEvents>,
  TEvents extends СontinuousPropEvent<TEventName, TValue> = СontinuousPropEvent<TEventName, TValue>,
> extends Prop<TEventName, TValue, TEmitter> {
  /**
   * Stores current value of the continuous action
   * @param {TValue} value inherits from Props
   */

  /**
   * Stores the last value of the previous continuous action
   */
  last: TValue

  constructor(eventName: TEventName, value: TValue, emitter: TEmitter) {
    super(eventName, value, emitter)

    this.last = value

    this.emitter.on(this.eventName, (event): void => {
      if (!event.isLast) return
      this.last = event.value
    })
  }
}
