import { Emitter } from '~/lib/emitter/emitter'
import { Any } from '~/utils/core'
import { Emitterable, EmitterableProp } from '~/utils/emitter'

import { Position } from '../../../types/position'

type PositionPropEmitterable = Emitterable<Emitter<Any>> & {
  height: EmitterableProp<string, number, Any>
  width: EmitterableProp<string, number, Any>
}

export class PositionProp<N extends string> extends EmitterableProp<N, Position, PositionPropEmitterable> {
  previous: Position

  last: Position

  constructor(eventName: N, value: Position, emitterable: PositionPropEmitterable) {
    super(eventName, value, emitterable)
    this.previous = value
    this.last = value

    this.emitterable.emitter.on(this.eventName, (event: { isLast: boolean; value: Position }) => {
      if (event.isLast) {
        this.previous = this.last
        this.last = event.value
      }
    })
  }

  get center(): Position {
    return {
      x: this.value.x + this.emitterable.width.value / 2,
      y: this.value.y + this.emitterable.height.value / 2,
    }
  }

  move = (x: number, y: number, isLast: boolean): void => {
    const position = { x: Math.round(x), y: Math.round(y) }
    this.set(position, { isLast })
  }
}
