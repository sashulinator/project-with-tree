import { Emitter } from './types/emitter'
import { Any } from '~/utils/core'
import { Prop } from './prop'

export interface TempPropEvent<TValue> {
  isLast: boolean
  value: TValue
}

/**
 * @final
 * Для хранения значений продолжительных/сontinuous процессов, таких как `перетаскивание`
 *
 * @template TEventName - Тип имени события
 * @template TValue - Тип значение
 */
export class СontinuousProp<TEventName extends string, TValue> extends Prop<TEventName, TValue> {
  /**
   * Хранит в себе последнее значение предыдущего продолжительного процесса
   */
  last: TValue

  constructor(eventName: TEventName, value: TValue, emitter: Emitter<Any>) {
    super(eventName, value, emitter)

    this.last = value

    this.emitter.on(this.eventName, (event: TempPropEvent<TValue>) => {
      if (!event.isLast) return
      this.last = event.value
    })
  }
}
