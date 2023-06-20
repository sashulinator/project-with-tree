import { Position, PositionProp } from '~/abstract/canvas'
import { Emitter } from '~/lib/emitter'
import { AnyEvent, Prop } from '~/utils/emitter'

import { BoardEvents } from './events'

export interface BoardStateProps {
  translate: Position
  scale: number
}

export class BoardState<TEvents extends AnyEvent> extends Emitter<TEvents & BoardEvents> {
  canvasBoardRef: Prop<'canvasBoardRef', null | SVGSVGElement>

  translate: PositionProp<'translate'>

  scale: Prop<'scale', number>

  constructor(props: BoardStateProps) {
    super()

    this.canvasBoardRef = new Prop<'canvasBoardRef', null | SVGSVGElement>('canvasBoardRef', null, this)

    this.translate = new PositionProp('translate', props.translate, this)

    this.scale = new Prop('scale', props.scale, this)
  }
}
