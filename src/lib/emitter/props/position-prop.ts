import { Emitter } from '~/lib/emitter'
import { Any, Position } from '~/utils/core'
import { Prop } from '~/utils/depricated-emitter'

export interface PositionPropEvent {
  isLast: boolean
  value: Position
}

/**
 * @final
 */
export class PositionProp<N extends string> extends Prop<N, Position> {
  last: Position

  constructor(eventName: N, value: Position, emitter: Emitter<Any>) {
    super(eventName, value, emitter)

    this.last = value

    this.emitter.on(this.eventName, (event: PositionPropEvent) => {
      if (!event.isLast) return
      this.last = event.value
    })
  }

  move = (x: number, y: number, isLast: boolean): void => {
    const position = { x: Math.round(x), y: Math.round(y) }
    this.set(position, { isLast })
  }
}
