import { EmitterableProp } from '~/utils/emitter'
import { Position } from '~/widgets/canvas/ui/item'

import { Events } from './events'
import { CanvasItemState } from './state'

export class PositionProp<N extends string> extends EmitterableProp<N, Position, CanvasItemState<Events>> {
  previous: Position

  last: Position

  constructor(eventName: N, value: Position, state: CanvasItemState<Events>) {
    super(eventName, value, state)
    this.previous = value
    this.last = value

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.emittableState.emitter.on(this.eventName as any, (event: { isLast: boolean; value: Position }) => {
      if (event.isLast) {
        this.previous = this.last
        this.last = event.value
      }
    })
  }

  get center(): Position {
    return {
      x: this.value.x + this.emittableState.width.value / 2,
      y: this.value.y + this.emittableState.height.value / 2,
    }
  }

  move = (x: number, y: number, isLast: boolean): void => {
    const position = { x: Math.round(x), y: Math.round(y) }
    this.set(position, { isLast })
  }
}
