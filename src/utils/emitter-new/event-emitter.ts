import { Emitter } from './emitter'
import { EmitterMap } from './types/emitter-map'
import { Events } from './types/events'
import { Listener } from './types/listener'

/**
 * @class EventEmitter
 * @property {Partial<{ [K in keyof TEvents]: Emitter<TEvents[K]> }> | undefined} listeners
 */
export class EventEmitter<TEvents extends Events> {
  emitterMap: EmitterMap<TEvents>

  /**
   * @constructor
   * @param {Partial<{ [K in keyof TEvents]: Emitter<TEvents[K]> }>} [emitters]
   */
  constructor(emitters?: EmitterMap<TEvents> | undefined) {
    this.emitterMap = emitters || {}
  }

  /**
   * Subscribes on event specified function
   * @template {keyof TEvents} T names
   * @param {T} eventName Event name
   * @param {Listener<TEvents[T]>} listener listener
   */
  on = <T extends keyof TEvents>(eventName: T, listener: Listener<TEvents[T]>): (() => void) => {
    const emitter = this.emitterMap[eventName]

    if (!emitter) {
      this.emitterMap[eventName] = new Emitter<TEvents[T]>([listener])
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
    const emitter = this.emitterMap[eventName]
    emitter?.emit(event)
  }

  /**
   * Removes an event handler for the given type.
   * @template {keyof TEvents} T names
   * @param {T} eventName Event name
   * @param {Listener<TEvents[T]>} listener listener
   */
  off = <T extends keyof TEvents>(eventName: T, listener: Listener<TEvents[T]>) => {
    const emitter = this.emitterMap[eventName]
    emitter?.remove(listener)
  }
}
