import { Any } from '~/utils/core'

export type EventType = string | symbol
export type Handler<T = Any> = (event: T) => void
export type WildcardHandler<T = Record<string, Any>> = (type: keyof T, event: T[keyof T]) => void
export type EventHandlerList<T = Any> = Array<Handler<T>>
export type WildCardEventHandlerList<T = Record<string, Any>> = Array<WildcardHandler<T>>
// export type EventHandlerMap<Events extends Record<EventType, Any>> = Map<
//   keyof Events | '*',
//   EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
// >
export interface Emitter<Events extends Record<EventType, Any>> {
  // all: EventHandlerMap<Events>
  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void
  on(type: '*', handler: WildcardHandler<Events>): void
  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void
  off(type: '*', handler: WildcardHandler<Events>): void
  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
  emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void
}
