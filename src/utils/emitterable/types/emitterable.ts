import { Any } from '~/utils/core'

import { Emitter, EventType } from './emitter'

export interface Emitterable<Events extends Record<EventType, Any>> {
  emitter: Emitter<Events>
}
