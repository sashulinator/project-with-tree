import { Dictionary } from '~/utils/dictionary'

export type Handler<T> = (event: T) => void

export type WildcardHandler<TEvents = Dictionary<unknown>> = (
  type: keyof TEvents,
  event: TEvents[keyof TEvents]
) => void

export interface Emitter<Events extends Dictionary<unknown>> {
  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void
  onAll(handler: WildcardHandler<Events>): void
  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void
  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
}
