import { Emitter } from '~/lib/emitter'
import { animate } from '~/utils/animate'
import { Any, Position } from '~/utils/core'
import { Prop } from '~/utils/depricated-emitter'
import { Events } from '~/utils/emitter'

export interface PositionPropEvent {
  last: boolean
  value: Position
}

/**
 * @final
 */
export class PositionProp<N extends string> extends Prop<N, Position> {
  previous: Position

  constructor(eventName: N, value: Position, emitter: Emitter<Any>) {
    super(eventName, value, emitter)

    this.previous = value

    this.emitter.on(this.eventName, (event: PositionPropEvent) => {
      if (!event.last) return
      this.previous = event.value
    })
  }

  move = (position: Position, event: { last: boolean } & Events): void => {
    const x = Math.round(position.x)
    const y = Math.round(position.y)
    this.set({ x, y }, event)
  }

  transitionMove = (position: Position, event?: Events, onEnd?: () => void): void => {
    const delta: Position = { x: this.value.x - position.x, y: this.value.y - position.y }
    const startPosition: Position = { ...this.value }

    animate(250, (progress) => {
      const x = Math.round(startPosition.x - delta.x * progress)
      const y = Math.round(startPosition.y - delta.y * progress)
      const last = progress === 1
      this.move({ x, y }, { last, ...event })
      if (last) onEnd?.()
    })
  }
}
