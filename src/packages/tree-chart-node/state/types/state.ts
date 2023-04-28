import { Emitter } from 'mitt'

import { Events } from './events'

export interface Position {
  x: number
  y: number
}

export interface NormalizeRet {
  position: Position
}

export interface State {
  mitt: Emitter<Events>
  position: Position
  normalize: () => NormalizeRet
  setPosition: (position: Position) => void
}
