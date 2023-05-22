import { EmittableProp, EmittableState } from '~/utils/emittable-state'

import { Translate } from '../types/translate'
import { EventNames } from './event-names'
import { Events } from './events'

export interface CanvasStateProps {
  translate: Translate
  scale: number
}

export class CanvasState extends EmittableState<Events> {
  private _translate: EmittableProp<EventNames.setTranslate, Translate>

  private _scale: EmittableProp<EventNames.setScale, number>

  constructor(props: CanvasStateProps) {
    super()

    this._translate = new EmittableProp(EventNames.setTranslate, props.translate, this)
    this._scale = new EmittableProp(EventNames.setScale, props.scale, this)
  }

  get translate(): Translate {
    return this._translate.value
  }

  setTranslate = (translate: Translate): void => {
    this._translate.value = translate
  }

  get scale(): number {
    return this._scale.value
  }

  setScale = (scale: number): void => {
    this._scale.value = scale
  }
}
