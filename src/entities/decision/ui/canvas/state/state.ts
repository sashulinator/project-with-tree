import { Decision } from '~/entities/decision'
import { PointState } from '~/entities/point'
import { EmitterableProp as Prop } from '~/utils/emitter'
import { BoardState, Position } from '~/widgets/canvas'

import { EditingLinkProp } from './editing-link-prop'
import { Events } from './events'
import { SelectedProp } from './selected-prop'

export interface DecisionStateProps {
  decision: Decision
  translate: Position
  scale: number
}

export class CanvasState extends BoardState<Events, PointState> {
  selected: SelectedProp<'setSelected'>

  decision: Decision

  canvasBoardRef: Prop<'setCanvasBoardRef', null | SVGSVGElement>

  paintingPanelRef: Prop<'setPaintingPanelRef', null | SVGGElement>

  editingLink: EditingLinkProp<'setEditingLink'>

  constructor(props: DecisionStateProps) {
    const itemStateList = props.decision.data.map(
      (item) => new PointState(item, { position: item, id: item.id, ruleList: item.rules })
    )

    super({ ...props, itemStateList })

    this.paintingPanelRef = new Prop<'setPaintingPanelRef', null | SVGGElement>('setPaintingPanelRef', null, this)

    this.canvasBoardRef = new Prop<'setCanvasBoardRef', null | SVGSVGElement>('setCanvasBoardRef', null, this)

    this.decision = props.decision

    this.selected = new SelectedProp('setSelected', [], this)

    this.editingLink = new EditingLinkProp('setEditingLink', null, this)
  }
}
