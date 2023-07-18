import { Notifier } from '../../notifier'

export type EventNotifiers<TEvents> = { [K in keyof TEvents]: Notifier<TEvents[K]> }
