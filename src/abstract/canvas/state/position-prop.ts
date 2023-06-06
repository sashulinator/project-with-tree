import { Emitter } from '~/lib/emitter/emitter'
import { Any } from '~/utils/core'
import { Emitterable, EmitterableProp } from '~/utils/emitter'

import { Position } from '../types/position'

// type PositionPropEmitterable = Emitterable<Emitter<Any>> & {
//   height: EmitterableProp<string, number, Any>
//   width: EmitterableProp<string, number, Any>
// }

export interface PositionPropEvent {
  isLast: boolean
  value: Position
}

export class PositionProp<N extends string> extends EmitterableProp<N, Position, Emitterable<Emitter<Any>>> {
  previous: Position

  last: Position

  constructor(eventName: N, value: Position, emitterable: Emitterable<Emitter<Any>>) {
    super(eventName, value, emitterable)
    this.previous = value
    this.last = value

    this.emitterable.emitter.on(this.eventName, (event: PositionPropEvent) => {
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
