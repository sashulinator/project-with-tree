import { Emitter, PositionProp } from '~/lib/emitter'
import { Position } from '~/utils/core'
import { AnyEvent, Prop } from '~/utils/depricated-emitter'

import { BoardEvents } from './events'

export interface BoardStateProps {
  translate: Position
  scale: number
}

export class BoardState<TEvents extends AnyEvent> extends Emitter<TEvents & BoardEvents> {
  ref: Prop<'ref', null | SVGSVGElement>

  translate: PositionProp<'translate'>

  scale: Prop<'scale', number>

  constructor(props: BoardStateProps) {
    super()

    this.ref = new Prop<'ref', null | SVGSVGElement>('ref', null, this)

    this.translate = new PositionProp('translate', props.translate, this)

    this.scale = new Prop('scale', props.scale, this)
  }
}
