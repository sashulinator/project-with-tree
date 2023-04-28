import { Emitter } from 'mitt'

import { Dictionary } from '~/utils/dictionary'

import { Events } from './events'

export interface Translate {
  x: number
  y: number
}

export interface NormalizeRet {
  scale: number
  translate: Translate
}

export interface State {
  mitt: Emitter<Events>
  scale: number
  translate: Translate
  states: Dictionary<{ normalize: () => unknown }>
  normalize: () => NormalizeRet
  setTranslate: (translate: Translate) => void
  setScale: (scale: number) => void
}
