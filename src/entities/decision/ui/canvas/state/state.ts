import mitt, { Emitter } from 'mitt'

import { Decision } from '~/entities/decision'
import { Id } from '~/utils/core'
import { Emitterable, EmitterableProp as Prop } from '~/utils/emitterable'
import { Translate } from '~/widgets/canvas'
import { EventNames as PointEventNames, Events as PointEvents, PointState } from '~/widgets/chart-item'

import { Events } from './events'
import { PointStatesProp } from './point-states-prop'

export interface DecisionStateProps {
  translate: Translate
  scale: number
  decision: Decision
}

export class CanvasState implements Emitterable<Events> {
  emitter: Emitter<Events>

  _translate: Prop<'setTranslate', Translate>

  _scale: Prop<'setScale', number>

  _selected: Prop<'setSelected', Id[]>

  _pointStates: PointStatesProp<'setItemStates'>

  decision: Decision

  // 👷 Constructor

  constructor(props: DecisionStateProps) {
    this.emitter = mitt()
    this.decision = props.decision
    this._translate = new Prop('setTranslate', props.translate, this)
    this._scale = new Prop('setScale', props.scale, this)
    this._selected = new Prop('setSelected', [], this)
    this._pointStates = new PointStatesProp('setItemStates', props.decision.data, this)
  }

  // 💉 Translate get/set

  get translate(): Translate {
    return this._translate.value
  }
  setTranslate = (translate: Translate): void => {
    this._translate.value = translate
  }

  // 💉 scale get/set

  get scale(): number {
    return this._scale.value
  }
  setScale = (scale: number): void => {
    this._scale.value = scale
  }

  // 💉 pointStates get and other

  get pointStates(): Record<Id, PointState> {
    return this._pointStates.value
  }
  emitPointState = <E extends PointEventNames>(id: Id, eventName: E, event: PointEvents[E]): void => {
    this._pointStates.emitPointState(id, eventName, event)
  }

  get selected(): Id[] {
    return this._selected.value
  }

  // Select
  select = (value: Id[]): void => {
    this._selected.value = value
  }

  unselect = (ids: Id[]): void => {
    this.select(this.selected.filter((s) => !ids.includes(s)))
  }

  selectToggle = (id: Id): void => {
    const isIncludes = this.selected.includes(id)
    isIncludes ? this.unselect([id]) : this.select([...this.selected, id])
  }
}
