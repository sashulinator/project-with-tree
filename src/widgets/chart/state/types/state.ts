import { Emitter } from 'mitt'

import { Events } from './events'

export interface Translate {
  x: number
  y: number
}

export interface State {
  mitt: Emitter<Events>
  scale: number
  translate: Translate
  setTranslate: (translate: Translate) => void
  setScale: (scale: number) => void
}
