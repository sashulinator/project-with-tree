import { Id } from '~/utils/core'
import { EmittableState } from '~/utils/emittable-state/emmitable-state'

import { EventNames } from './event-names'
import { Events } from './events'

export interface Translate {
  x: number
  y: number
}

export interface StateProps<S> {
  translate: Translate
  scale: number
  itemStates: Record<Id, S>
}

export class State<D, S> extends EmittableState<D, Events<S>> {
  translate: Translate

  scale: number

  itemStates: Record<Id, S>

  constructor(data: D, props: StateProps<S>) {
    super(data)
    this.subscribe()

    this.itemStates = props.itemStates
    this.scale = props.scale
    this.translate = props.translate
  }

  private subscribe = (): void => {
    this.mitt.on(EventNames.setScale, (event) => {
      this.scale = event.scale
    })
    this.mitt.on(EventNames.setTranslate, (event) => {
      this.translate = event.translate
    })
    this.mitt.on(EventNames.addItem, (event) => {
      this.itemStates[event.id] = event.state
    })
  }

  setTranslate = (translate: Translate): void => {
    this.mitt.emit(EventNames.setTranslate, { translate })
  }

  setScale = (scale: number): void => {
    this.mitt.emit(EventNames.setScale, { scale })
  }

  addItem = (id: Id, state: S): void => {
    this.mitt.emit(EventNames.addItem, { id, state })
  }
}
