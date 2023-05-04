import { Id } from '~/utils/core'
import { EmittableState } from '~/utils/emittable-state'

import { Position } from '../types/position'
import { EventNames } from './event-names'
import { Events } from './events'

export interface StateProps {
  id: Id
  position: Position
}

export class State<D> extends EmittableState<D, Events> {
  id: Id
  position: Position
  height: number
  width: number

  constructor(data: D, props: StateProps) {
    super(data)
    this.subscribe()

    this.id = props.id
    this.position = props.position
    this.height = 100
    this.width = 200
  }

  private subscribe = (): void => {
    this.mitt.on(EventNames.setPosition, (event) => {
      this.position = event.position
    })
  }

  setPosition(position: Position): void {
    this.mitt.emit(EventNames.setPosition, { position })
  }
}
