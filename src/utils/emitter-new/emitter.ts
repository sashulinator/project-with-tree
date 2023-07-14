import { Events } from './types/events'
import { Listener } from './types/listener'
import { ListenerDictionary } from './types/listener-dictionary'

/**
 * @class Emitter
 * @property {ListenerDictionary<TEvents> | undefined} listeners
 */
export class Emitter<TEvents extends Events> {
  listeners: ListenerDictionary<TEvents>

  /**
   * @constructor
   * @param {ListenerDictionary<TEvents>} [listeners]
   */
  constructor(listeners?: ListenerDictionary<TEvents> | undefined) {
    this.listeners = listeners || {}
  }

  /**
   * Subscribes on event specified function
   * @template {keyof TEvents} T names
   * @param {T} eventName Event name
   * @param {Listener<TEvents[T]>} listener listener
   */
  on = <T extends keyof TEvents>(eventName: T, listener: Listener<TEvents[T]>): (() => void) => {
    const eventListenerList = this.listeners[eventName]

    if (!eventListenerList) {
      this.listeners[eventName] = [listener]
    } else {
      eventListenerList?.push(listener)
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
    const eventListenerList = this.listeners[eventName]
    const length = eventListenerList?.length || 0

    for (let index = 0; index < length; index++) {
      const listener = eventListenerList?.[index]
      listener?.(event)
    }
  }

  /**
   * Removes an event handler for the given type.
   * @template {keyof TEvents} T names
   * @param {T} eventName Event name
   * @param {Listener<TEvents[T]>} listener listener
   */
  off = <T extends keyof TEvents>(eventName: T, listener: Listener<TEvents[T]>) => {
    const eventListenerList = this.listeners[eventName]
    eventListenerList?.splice(eventListenerList.indexOf(listener) >>> 0, 1)
  }
}
