import { ActionHistory } from '~/utils/action-history'
import { Any, Id } from '~/utils/core'
import { Dictionary, add, remove } from '~/utils/dictionary'
import { EmittableState } from '~/utils/emittable-state'
import { EmittableProp } from '~/utils/emittable-state/emittable-prop'
import { State as ItemState } from '~/widgets/chart-item'

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

export class State<D, S extends ItemState<Any>> extends EmittableState<Events<S>> {
  translate: EmittableProp<EventNames.setTranslate, Translate>

  scale: EmittableProp<EventNames.setScale, number>

  selected: EmittableProp<EventNames.setSelected, Id[]>

  itemStates: Record<Id, S>

  history: ActionHistory

  data: D

  constructor(data: D, props: StateProps<S>) {
    super()
    this.data = data
    this.subscribe()

    this.history = new ActionHistory()

    this.translate = new EmittableProp(EventNames.setTranslate, props.translate, this)
    this.scale = new EmittableProp(EventNames.setScale, props.scale, this)
    this.selected = new EmittableProp(EventNames.setSelected, [], this)

    const initItemStates = props.itemStates

    this.itemStates = initItemStates
  }

  private subscribe = (): void => {
    this.emitter.on(EventNames.setItemStates, (event) => {
      this.itemStates = event.itemStates
    })
    this.emitter.on(EventNames.setItemState, (event) => {
      const state = this.itemStates[event.id]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.emitter.emit(event.eventName as any, event.event)
    })
  }

  // History
  addHistory<E extends EventNames>(eventName: E, redoEvent: Events<S>[E], undoEvent: Events<S>[E]): void {
    const redo = (): void => this.emitter.emit(eventName, redoEvent)
    const undo = (): void => this.emitter.emit(eventName, undoEvent)
    this.history.add(redo, undo)
  }

  setItemState<E extends string>(id: Id, eventName: E, redoEvent: Dictionary<Any>, undoEvent: Dictionary<Any>): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.addHistory(EventNames.setItemState, { id, eventName, event: redoEvent }, { id, eventName, event: undoEvent })
  }

  // Camera
  setTranslate = (translate: Translate): void => {
    this.translate.value = translate
  }

  setScale = (scale: number): void => {
    this.scale.value = scale
  }

  // Select
  select = (value: Id[]): void => {
    this.addHistory(EventNames.setSelected, { value }, { value: this.selected.value })
  }

  unselect = (ids: Id[]): void => {
    this.select(this.selected.value.filter((s) => !ids.includes(s)))
  }

  selectToggle = (id: Id): void => {
    const isIncludes = this.selected.value.includes(id)
    isIncludes ? this.unselect([id]) : this.select([...this.selected.value, id])
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
