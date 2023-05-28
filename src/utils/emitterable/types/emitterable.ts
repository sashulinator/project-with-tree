import { Any } from '~/utils/core'

import { AnyEmitter } from './emitter'

export interface Emitterable<E extends AnyEmitter> {
  emitter: E
}
