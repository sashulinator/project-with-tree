import { Any, Id } from '~/utils/core'
import { Dictionary, add, remove } from '~/utils/dictionary'
import { EmittableState } from '~/utils/emittable-state/emittable-state'
import { ActionHistory } from '~/utils/history'

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

export class State<D, S extends EmittableState<Any>> extends EmittableState<Events<S>> {
  translate: Translate

  scale: number

  selected: Id[]

  itemStates: Record<Id, S>
  data: D
  history: ActionHistory

  constructor(data: D, props: StateProps<S>) {
    super()
    this.data = data
    this.subscribe()

    this.scale = props.scale
    this.translate = props.translate

    const initSelected = []
    const initItemStates = props.itemStates

    this.selected = initSelected
    this.itemStates = initItemStates

    this.history = new ActionHistory()
  }

  private subscribe = (): void => {
    this.mitt.on(EventNames.setScale, (event) => {
      this.scale = event.scale
    })
    this.mitt.on(EventNames.setTranslate, (event) => {
      this.translate = event.translate
    })
    this.mitt.on(EventNames.setItemStates, (event) => {
      this.itemStates = event.itemStates
    })
    this.mitt.on(EventNames.select, (event) => {
      this.selected = event.ids
    })
    this.mitt.on(EventNames.setItemState, (event) => {
      const state = this.itemStates[event.id]
      state.mitt.emit(event.eventName, event.event)
    })
  }

  // History
  addHistory<E extends EventNames>(eventName: E, redoEvent: Events<S>[E], undoEvent: Events<S>[E]): void {
    const redo = (): void => {
      this.mitt.emit(eventName, redoEvent)
    }
    const undo = (): void => {
      this.mitt.emit(eventName, undoEvent)
    }
    this.history.add(redo, undo)
    this.history.redo()
  }

  setItemState<E extends string>(id: Id, eventName: E, redoEvent: Dictionary<Any>, undoEvent: Dictionary<Any>): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.addHistory(EventNames.setItemState, { id, eventName, event: redoEvent }, { id, eventName, event: undoEvent })
  }

  // Camera
  setTranslate = (translate: Translate): void => {
    this.mitt.emit(EventNames.setTranslate, { translate })
  }

  setScale = (scale: number): void => {
    this.mitt.emit(EventNames.setScale, { scale })
  }

  // Select
  select = (ids: Id[]): void => {
    this.addHistory(EventNames.select, { ids }, { ids: this.selected })
  }

  unselect = (ids: Id[]): void => {
    this.select(this.selected.filter((s) => !ids.includes(s)))
  }

  selectToggle = (id: Id): void => {
    const isIncludes = this.selected.includes(id)
    isIncludes ? this.unselect([id]) : this.select([...this.selected, id])
  }

  // CRUD
  setItemStates = (itemStates: Record<Id, S>): void => {
    this.addHistory(EventNames.setItemStates, { itemStates }, { itemStates: this.itemStates })
  }

  addItemState = (id: Id, state: S): void => {
    const newItemStates = add(this.itemStates, id, state)
    this.setItemStates(newItemStates)
  }

  removeItemState = (id: Id): void => {
    const newItemStates = remove(this.itemStates, id)
    this.setItemStates(newItemStates)
  }
}
