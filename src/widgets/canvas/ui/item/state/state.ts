import { Emitter } from '~/lib/emitter/emitter'
import { Id } from '~/utils/core'
import { Emitterable, EmitterableProp } from '~/utils/emitter'

import { PositionProp } from '../../../state/position-prop'
import { Position } from '../../../types/position'
import { CanvasItemEvents } from './events'

export interface CanvasItemStateProps {
  id: Id
  width?: number | undefined
  height?: number | undefined
  position: Position
}

export class CanvasItemState<E extends CanvasItemEvents> implements Emitterable<Emitter<E>> {
  emitter: Emitter<E>

  id: Id

  ref: EmitterableProp<'setRef', null | HTMLElement>

  width: EmitterableProp<'setWidth', number>

  height: EmitterableProp<'setHeight', number>

  position: PositionProp<'setPosition'>

  constructor(props: CanvasItemStateProps) {
    this.emitter = new Emitter<E>()

    this.id = props.id

    this.height = new EmitterableProp('setHeight', props.height || 0, this)

    this.width = new EmitterableProp('setWidth', props.width || 0, this)

    this.ref = new EmitterableProp<'setRef', null | HTMLElement>('setRef', null, this)

    this.position = new PositionProp('setPosition', props.position, this)
  }
}
