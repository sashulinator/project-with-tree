import { EmitterableProp } from '~/utils/emitterable'
import { Position } from '~/widgets/chart-item'

import { PointState } from './state'

export class PositionProp<N extends string> extends EmitterableProp<N, Position> {
  last: Position

  constructor(eventName: N, value: Position, state: PointState) {
    super(eventName, value, state)
    this.last = value
  }

  set = (position: Position, isLast: boolean): void => {
    this.value = position

    if (isLast) {
      this.last = position
    }
  }
}
