import { Listener } from './types/listener'

/**
 * @class Emitter
 * @property { Listener<TEvents>[]} listeners
 */
export class Notifier<TValue extends unknown> {
  listeners: Listener<TValue>[]

  /**
   * @constructor
   * @param {ListenerDictionary<TValue>} [listeners]
   */
  constructor(listeners?: Listener<TValue>[] | undefined) {
    this.listeners = listeners ?? []
  }

  /**
   * Subscribes listener.
   * @param {Listener<TValue[T]>} listener listener
   */
  add = (listener: Listener<TValue>): (() => void) => {
    this.listeners.push(listener)
    return () => this.remove(listener)
  }

  /**
   * Removes listener.
   * @param {Listener<TValue[T]>} listener listener
   */
  remove = (listener: Listener<TValue>) => {
    this.listeners?.splice(this.listeners.indexOf(listener) >>> 0, 1)
  }

  /**
   * Notify all listeners.
   * @param {TValue[T]} value Event
   */
  notify = (value: TValue): void => {
    for (let index = 0; index < this.listeners.length; index++) {
      const listener = this.listeners?.[index]
      listener?.(value)
    }
  }
}
