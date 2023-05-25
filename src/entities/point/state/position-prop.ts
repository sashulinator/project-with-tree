import { EmitterableProp } from '~/utils/emitterable'
import { Position } from '~/widgets/chart-item'

import { PointState } from './state'

export class PositionProp<N extends string> extends EmitterableProp<N, Position> {
  previous: Position

  last: Position

  constructor(eventName: N, value: Position, state: PointState) {
    super(eventName, value, state)
    this.previous = value
    this.last = value

    this.emittableState.emitter.on(this.eventName, (event: { isLast: boolean; value: Position }) => {
      if (event.isLast) {
        this.previous = this.last
        this.last = event.value
      }
    })
  }

  move = (x: number, y: number, isLast: boolean): void => {
    const position = { x: Math.round(x), y: Math.round(y) }
    this.set(position, { isLast })
  }
}
