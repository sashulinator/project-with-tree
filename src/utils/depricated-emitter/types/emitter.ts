import { Any, Key } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export type AnyEvent = Dictionary<Any>

export type Handler<T = Any> = (event: T) => void

export type WildcardHandler<T = AnyEvent> = (type: keyof T, event: T[keyof T]) => void

export type EventHandlerList<T = Any> = Array<Handler<T>>

export type WildCardEventHandlerList<T = AnyEvent> = Array<WildcardHandler<T>>

export type EventHandlerMap<Events extends Record<Key, Any>> = Map<
  keyof Events,
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>

export interface Emitter<Events extends AnyEvent> {
  all: EventHandlerMap<Events>
  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void
  on(type: string, handler: Handler<Any>): void
  onAll(handler: WildcardHandler<Events>): void
  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void
  off(type: string, handler?: Handler<Any>): void
  offAll(handler?: WildcardHandler<Events> | undefined): void
  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
  emit(type: string, event: Any): void
}

export type AnyEmitter = Emitter<AnyEvent>
