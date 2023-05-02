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

  selected: Id[]

  itemStates: Record<Id, S>

  constructor(data: D, props: StateProps<S>) {
    super(data)
    this.subscribe()
    this.selected = []
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
    this.mitt.on(EventNames.select, (event) => {
      this.selected = event.ids
    })
    this.mitt.on(EventNames.unselect, (event) => {
      this.mitt.emit(EventNames.select, { ids: this.selected.filter((s) => !event.ids.includes(s)) })
    })
    this.mitt.on(EventNames.selectToggle, (event) => {
      const isIncludes = this.selected.includes(event.id)
      isIncludes
        ? this.mitt.emit(EventNames.unselect, { ids: [event.id] })
        : this.mitt.emit(EventNames.select, { ids: [...this.selected, event.id] })
    })
  }

  setTranslate = (translate: Translate): void => {
    this.mitt.emit(EventNames.setTranslate, { translate })
  }

  setScale = (scale: number): void => {
    this.mitt.emit(EventNames.setScale, { scale })
  }

  select = (ids: Id[]): void => {
    this.mitt.emit(EventNames.select, { ids })
  }

  unselect = (ids: Id[]): void => {
    this.mitt.emit(EventNames.unselect, { ids })
  }

  selectToggle = (id: Id): void => {
    this.mitt.emit(EventNames.selectToggle, { id })
  }

  addItem = (id: Id, state: S): void => {
    this.mitt.emit(EventNames.addItem, { id, state })
  }
}
