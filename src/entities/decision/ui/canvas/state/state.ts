import mitt, { Emitter } from 'mitt'

import { Decision } from '~/entities/decision'
import { ActionHistory } from '~/utils/action-history'
import { Any, Id } from '~/utils/core'
import { Dictionary, add, remove } from '~/utils/dictionary'
import { Emitterable } from '~/utils/emitterable'
import { EmitterableProp } from '~/utils/emitterable/emitterable-prop'
import { Translate } from '~/widgets/canvas'
import { PointState } from '~/widgets/chart-item'

import { EventNames } from './event-names'
import { Events } from './events'
import { PointStatesProp } from './point-states-prop'

export interface DecisionStateProps {
  translate: Translate
  scale: number
  decision: Decision
}

export class CanvasState implements Emitterable<Events> {
  emitter: Emitter<Events>

  private _translate: EmitterableProp<'setTranslate', Translate>

  private _scale: EmitterableProp<'setScale', number>

  private _selected: EmitterableProp<'setSelected', Id[]>

  private _pointStates: PointStatesProp<'setItemStates'>

  history: ActionHistory

  decision: Decision

  constructor(props: DecisionStateProps) {
    this.emitter = mitt()

    this.decision = props.decision

    this.subscribe()

    this.history = new ActionHistory()

    this._translate = new EmitterableProp('setTranslate', props.translate, this)
    this._scale = new EmitterableProp('setScale', props.scale, this)
    this._selected = new EmitterableProp('setSelected', [], this)
    this._pointStates = new PointStatesProp('setItemStates', props.decision.data, this)
  }

  get translate(): Translate {
    return this._translate.value
  }

  get scale(): number {
    return this._scale.value
  }

  get pointStates(): Record<Id, PointState> {
    return this._pointStates.value
  }

  get selected(): Id[] {
    return this._selected.value
  }

  private subscribe = (): void => {
    this.emitter.on('setItemState', (event) => {
      const state = this.pointStates[event.id]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.emitter.emit(event.eventName as any, event.event)
    })
  }

  // History
  addHistory<E extends EventNames>(eventName: E, redoEvent: Events[E], undoEvent: Events[E]): void {
    const redo = (): void => this.emitter.emit(eventName, redoEvent)
    const undo = (): void => this.emitter.emit(eventName, undoEvent)
    this.history.add(redo, undo)
  }

  setItemState<E extends string>(id: Id, eventName: E, redoEvent: Dictionary<Any>, undoEvent: Dictionary<Any>): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.addHistory('setItemState', { id, eventName, event: redoEvent }, { id, eventName, event: undoEvent })
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
    this.addHistory('setSelected', { value }, { value: this.selected })
  }

  unselect = (ids: Id[]): void => {
    this.select(this.selected.filter((s) => !ids.includes(s)))
  }

  selectToggle = (id: Id): void => {
    const isIncludes = this.selected.includes(id)
    isIncludes ? this.unselect([id]) : this.select([...this.selected, id])
  }

  // CRUD
  setItemStates = (value: Record<Id, PointState>): void => {
    this.addHistory('setItemStates', { value }, { value: this.pointStates })
  }

  addItemState = (id: Id, state: PointState): void => {
    const newItemStates = add(this.pointStates, id, state)
    this.setItemStates(newItemStates)
  }

  removeItemState = (id: Id): void => {
    const newItemStates = remove(this.pointStates, id)
    this.setItemStates(newItemStates)
  }
}
