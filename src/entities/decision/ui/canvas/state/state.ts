import { Decision } from '~/entities/decision'
import { Emitter } from '~/lib/emitter/emitter'
import { Emitterable, EmitterableProp as Prop } from '~/utils/emitter'
import { Position, PositionProp } from '~/widgets/canvas'

import { EditingLinkProp } from './editing-link-prop'
import { Events } from './events'
import { PointStatesProp } from './point-states-prop'
import { SelectedProp } from './selected-prop'

export interface DecisionStateProps {
  translate: Position
  scale: number
  decision: Decision
}

export class CanvasState implements Emitterable<Emitter<Events>> {
  emitter: Emitter<Events>

  selected: SelectedProp<'setSelected'>

  translate: PositionProp<'setTranslate'>

  scale: Prop<'setScale', number>

  pointStates: PointStatesProp<'setItemStates'>

  decision: Decision

  canvasBoardRef: Prop<'setCanvasBoardRef', null | SVGSVGElement>

  paintingPanelRef: Prop<'setPaintingPanelRef', null | SVGGElement>

  editingLink: EditingLinkProp<'setEditingLink'>

  // 👷 Constructor

  constructor(props: DecisionStateProps) {
    this.emitter = new Emitter<Events>()
    this.paintingPanelRef = new Prop<'setPaintingPanelRef', null | SVGGElement>('setPaintingPanelRef', null, this)
    this.canvasBoardRef = new Prop<'setCanvasBoardRef', null | SVGSVGElement>('setCanvasBoardRef', null, this)
    this.decision = props.decision
    this.selected = new SelectedProp('setSelected', [], this)
    this.pointStates = new PointStatesProp('setItemStates', props.decision.data, this)
    this.translate = new PositionProp('setTranslate', props.translate, this)
    this.scale = new Prop('setScale', props.scale, this)
    this.editingLink = new EditingLinkProp('setEditingLink', null, this)
  }
}
