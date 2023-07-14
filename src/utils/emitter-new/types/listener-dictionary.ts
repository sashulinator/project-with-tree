import { Listener } from './listener'

export type ListenerDictionary<TEvents> = Partial<{ [K in keyof TEvents]: Listener<TEvents[K]>[] }>
