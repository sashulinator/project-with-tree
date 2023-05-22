import mitt, { Emitter } from 'mitt'

import { Emitterable, EmitterableProp } from '~/utils/emitterable'

import { Translate } from '../types/translate'
import { EventNames } from './event-names'
import { Events } from './events'

export interface CanvasEmitterableProps {
  translate: Translate
  scale: number
}

export class CanvasEmitterable implements Emitterable<Events> {
  emitter: Emitter<Events>

  private _translate: EmitterableProp<EventNames.setTranslate, Translate>

  private _scale: EmitterableProp<EventNames.setScale, number>

  // 👷 Constructor

  constructor(props: CanvasEmitterableProps) {
    this.emitter = mitt()

    this._translate = new EmitterableProp(EventNames.setTranslate, props.translate, this)
    this._scale = new EmitterableProp(EventNames.setScale, props.scale, this)
  }

  // 💉 Translate get/set

  get translate(): Translate {
    return this._translate.value
  }
  setTranslate = (translate: Translate): void => {
    this._translate.value = translate
  }

  // 💉 Scale get/set

  get scale(): number {
    return this._scale.value
  }
  setScale = (scale: number): void => {
    this._scale.value = scale
  }
}
