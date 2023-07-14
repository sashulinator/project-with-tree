import { Emitter } from '../emitter'

export type EmitterMap<TEvents> = Partial<{ [K in keyof TEvents]: Emitter<TEvents[K]> }>
