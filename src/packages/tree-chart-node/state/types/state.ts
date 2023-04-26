import { Emitter } from 'mitt'

import { Events } from './events'

export interface Position {
  x: number
  y: number
}

export interface State {
  mitt: Emitter<Events>
  position: Position
  setPosition: (position: Position) => void
}
