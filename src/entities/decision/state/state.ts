import { LinkedDecision } from '~/entities/decision'
import { Point } from '~/entities/point'
import { ActionHistory } from '~/utils/action-history'
import { Any, Id } from '~/utils/core'
import { Dictionary, add, remove } from '~/utils/dictionary'
import { EmittableState } from '~/utils/emittable-state'
import { EmittableProp } from '~/utils/emittable-state/emittable-prop'
import { PointState as ItemState } from '~/widgets/chart-item'

import { EventNames } from './event-names'
import { Events } from './events'
import { PointStatesProp } from './point-states-prop'

export interface Translate {
  x: number
  y: number
}

export interface DecisionStateProps {
  translate: Translate
  scale: number
  pointList: (Point | LinkedDecision)[]
}

export class DecisionState<D, S extends ItemState<Any>> extends EmittableState<Events<S>> {
  private _translate: EmittableProp<EventNames.setTranslate, Translate>

  private _scale: EmittableProp<EventNames.setScale, number>

  private _selected: EmittableProp<EventNames.setSelected, Id[]>

  private _pointStates: PointStatesProp<EventNames.setItemStates>

  history: ActionHistory

  data: D

  constructor(data: D, props: DecisionStateProps) {
    super()
    this.data = data
    this.subscribe()

    this.history = new ActionHistory()

    this._translate = new EmittableProp(EventNames.setTranslate, props.translate, this)
    this._scale = new EmittableProp(EventNames.setScale, props.scale, this)
    this._selected = new EmittableProp(EventNames.setSelected, [], this)
    this._pointStates = new PointStatesProp(EventNames.setItemStates, props.pointList, this)
  }

  get translate(): Translate {
    return this._translate.value
  }

  get scale(): number {
    return this._scale.value
  }

  get pointStates(): Record<Id, S> {
    return this._pointStates.value as Record<Id, S>
  }

  get selected(): Id[] {
    return this._selected.value
  }

  private subscribe = (): void => {
    this.emitter.on(EventNames.setItemState, (event) => {
      const state = this.pointStates[event.id]
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
    this._translate.value = translate
  }

  setScale = (scale: number): void => {
    this._scale.value = scale
  }

  // Select
  select = (value: Id[]): void => {
    this.addHistory(EventNames.setSelected, { value }, { value: this.selected })
  }

  unselect = (ids: Id[]): void => {
    this.select(this.selected.filter((s) => !ids.includes(s)))
  }

  selectToggle = (id: Id): void => {
    const isIncludes = this.selected.includes(id)
    isIncludes ? this.unselect([id]) : this.select([...this.selected, id])
  }

  // CRUD
  setItemStates = (value: Record<Id, S>): void => {
    this.addHistory(EventNames.setItemStates, { value }, { value: this.pointStates })
  }

  addItemState = (id: Id, state: S): void => {
    const newItemStates = add(this.pointStates, id, state)
    this.setItemStates(newItemStates)
  }

  removeItemState = (id: Id): void => {
    const newItemStates = remove(this.pointStates, id)
    this.setItemStates(newItemStates)
  }
}
