import { Notifier, Listener } from '../notifier'
import { EventNotifiers } from './types/event-notifiers'
import { Events } from './types/events'

/**
 * @class EventEmitter
 * @property {{ [K in keyof TEvents]: Emitter<TEvents[K]> } | undefined} listeners
 */
export class Emitter<TEvents extends Events> {
  eventNotifiers: EventNotifiers<TEvents>

  /**
   * @constructor
   * @param {{ [K in keyof TEvents]: Notifier<TEvents[K]> }} [eventNotifiers]
   */
  constructor(eventNotifiers: EventNotifiers<TEvents>) {
    this.eventNotifiers = eventNotifiers
  }

  /**
   * Subscribes on event specified function
   * @template {keyof TEvents} T names
   * @param {T} eventName Event name
   * @param {Listener<TEvents[T]>} listener listener
   */
  on = <T extends keyof TEvents>(eventName: T, listener: Listener<TEvents[T]>): (() => void) => {
    const notifier = this.eventNotifiers[eventName]

    if (!notifier) {
      this.eventNotifiers[eventName] = new Notifier<TEvents[T]>([listener])
    } else {
      notifier.add(listener)
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
    const notifier = this.eventNotifiers[eventName]
    notifier?.notify(event)
  }

  /**
   * Removes an event handler for the given type.
   * @template {keyof TEvents} T names
   * @param {T} eventName Event name
   * @param {Listener<TEvents[T]>} listener listener
   */
  off = <T extends keyof TEvents>(eventName: T, listener: Listener<TEvents[T]>) => {
    const notifier = this.eventNotifiers[eventName]
    notifier?.remove(listener)
  }
}
