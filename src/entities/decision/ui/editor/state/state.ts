import { interpolateNumber, transition } from 'd3'

import { BoardEvents, BoardState, Position } from '~/abstract/canvas'
import { Decision } from '~/entities/decision/types/decision'
import { Id, assertNotNull } from '~/utils/core'
import { Prop } from '~/utils/emitter'

import { D3Selection } from './d3-selection'
import { D3Zoom } from './d3-zoom'
import { Events } from './events'
import { SelectedProp } from './selected-prop'

export interface EditorStateProps {
  translate: Position
  scale: number
  decision: Decision
}

export class EditorState extends BoardState<Events> {
  selected: SelectedProp<'selected'>

  decision: Decision

  name: Prop<'name', string>

  d3selection: D3Selection<Events & BoardEvents>

  d3zoom: D3Zoom<Events & BoardEvents>

  constructor(props: EditorStateProps) {
    super({ ...props })

    this.decision = props.decision

    this.name = new Prop('name', props.decision.name, this)

    this.selected = new SelectedProp('selected', [], this)

    this.d3selection = new D3Selection(this)

    this.d3zoom = new D3Zoom(this)
  }
}
