import { Decision } from '~/entities/decision'
import { Emitter } from '~/lib/emitter/emitter'
import { EmitterableProp as Prop } from '~/utils/emitter'
import { Position } from '~/widgets/canvas'
import { BoardState } from '~/widgets/canvas/ui/board/state'

import { EditingLinkProp } from './editing-link-prop'
import { Events } from './events'
import { PointStatesProp } from './point-states-prop'
import { SelectedProp } from './selected-prop'

export interface DecisionStateProps {
  translate: Position
  scale: number
  decision: Decision
}

export class CanvasState extends BoardState<Events> {
  emitter: Emitter<Events>

  selected: SelectedProp<'setSelected'>

  pointStates: PointStatesProp<'setItemStates'>

  decision: Decision

  canvasBoardRef: Prop<'setCanvasBoardRef', null | SVGSVGElement>

  paintingPanelRef: Prop<'setPaintingPanelRef', null | SVGGElement>

  editingLink: EditingLinkProp<'setEditingLink'>

  constructor(props: DecisionStateProps) {
    super(props)

    this.emitter = new Emitter<Events>()

    this.paintingPanelRef = new Prop<'setPaintingPanelRef', null | SVGGElement>('setPaintingPanelRef', null, this)

    this.canvasBoardRef = new Prop<'setCanvasBoardRef', null | SVGSVGElement>('setCanvasBoardRef', null, this)

    this.decision = props.decision

    this.selected = new SelectedProp('setSelected', [], this)

    this.pointStates = new PointStatesProp('setItemStates', props.decision.data, this)

    this.editingLink = new EditingLinkProp('setEditingLink', null, this)
  }
}
