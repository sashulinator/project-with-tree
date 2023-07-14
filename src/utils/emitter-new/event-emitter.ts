import { Emitter } from './emitter'
import { Events } from './types/events'
import { Listener } from './types/listener'

/**
 * @class EventEmitter
 * @property {ListenerDictionary<TEvents> | undefined} listeners
 */
export class EventEmitter<TEvents extends Events> {
  emitters: Partial<{ [K in keyof TEvents]: Emitter<TEvents[K]> }>

  /**
   * @constructor
   * @param {ListenerDictionary<TEvents>} [emitters]
   */
  constructor(emitters?: Partial<{ [K in keyof TEvents]: Emitter<TEvents[K]> }> | undefined) {
    this.emitters = emitters || {}
  }

  /**
   * Subscribes on event specified function
   * @template {keyof TEvents} T names
   * @param {T} eventName Event name
   * @param {Listener<TEvents[T]>} listener listener
   */
  on = <T extends keyof TEvents>(eventName: T, listener: Listener<TEvents[T]>): (() => void) => {
    const emitter = this.emitters[eventName]

    if (!emitter) {
      this.emitters[eventName] = new Emitter<TEvents[T]>([listener])
    } else {
      emitter.add(listener)
    }

    return () => this.off(eventName, listener)
  }

  /**
   * Invokes all handlers for the given event name.
   * @template {keyof TEvents} T names
   * @param {T} eventName Event name
   * @param {TEvents[T]} event Event
   */
  emit = <T extends keyof TEvents>(eventName: T, event: TEvents[T]): void => {
    const emitter = this.emitters[eventName]
    emitter?.emit(event)
  }

  /**
   * Removes an event handler for the given type.
   * @template {keyof TEvents} T names
   * @param {T} eventName Event name
   * @param {Listener<TEvents[T]>} listener listener
   */
  off = <T extends keyof TEvents>(eventName: T, listener: Listener<TEvents[T]>) => {
    const emitter = this.emitters[eventName]
    emitter?.remove(listener)
  }
}
