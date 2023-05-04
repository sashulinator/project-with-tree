import { EmittableState } from '~/utils/emittable-state/emmitable-state'

import { EventNames } from './event-names'
import { Events } from './events'

export interface Position {
  x: number
  y: number
}

export interface NormalizeRet {
  position: Position
}

export interface StateProps {
  position: Position
}

export class State<D> extends EmittableState<D, Events> {
  position: Position
  height: number
  width: number

  constructor(data: D, props: StateProps) {
    super(data)
    this.subscribe()

    this.position = props.position
    this.height = 100
    this.width = 200
  }

  private subscribe = (): void => {
    this.mitt.on(EventNames.setPosition, (event) => {
      this.position = event.position
    })
  }

  normalize = (): D => {
    return {
      ...this.data,
      position: this.position,
    }
  }

  setPosition(position: Position): void {
    this.mitt.emit(EventNames.setPosition, { position })
  }
}
