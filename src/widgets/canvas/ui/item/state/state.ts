import { Emitter } from '~/lib/emitter/emitter'
import { Id } from '~/utils/core'
import { AnyEvent, Emitterable, EmitterableProp } from '~/utils/emitter'

import { Position } from '../../../types/position'
import { Events } from './events'
import { PositionProp } from './position-prop'

export interface CanvasItemStateProps {
  id: Id
  width?: number | undefined
  height?: number | undefined
  position: Position
}

export class CanvasItemState<E extends Events> implements Emitterable<Emitter<E>> {
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
