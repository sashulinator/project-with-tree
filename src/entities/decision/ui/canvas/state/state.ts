import mitt, { Emitter } from 'mitt'

import { Decision } from '~/entities/decision'
import { Emitterable, EmitterableProp as Prop } from '~/utils/emitterable'
import { Translate } from '~/widgets/canvas'

import { Events } from './events'
import { PointStatesProp } from './point-states-prop'
import { SelectedProp } from './selected-prop'

export interface DecisionStateProps {
  translate: Translate
  scale: number
  decision: Decision
}

export class CanvasState implements Emitterable<Events> {
  emitter: Emitter<Events>

  selected: SelectedProp<'setSelected'>

  _translate: Prop<'setTranslate', Translate>

  _scale: Prop<'setScale', number>

  pointStates: PointStatesProp<'setItemStates'>

  decision: Decision

  paintingPanelRef: { current: null | SVGGElement }

  // 👷 Constructor

  constructor(props: DecisionStateProps) {
    this.emitter = mitt()
    this.paintingPanelRef = { current: null }
    this.decision = props.decision
    this.selected = new SelectedProp('setSelected', [], this)
    this.pointStates = new PointStatesProp('setItemStates', props.decision.data, this)
    this._translate = new Prop('setTranslate', props.translate, this)
    this._scale = new Prop('setScale', props.scale, this)
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

  setPaintingPanelRef = (element: SVGGElement): void => {
    if (element === this.paintingPanelRef.current) return
    this.emitter.emit('setPaintingPanelRef', { element })
  }
}
