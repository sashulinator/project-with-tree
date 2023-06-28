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

  centerNode = (id: Id): void => {
    const nodeEl = document.querySelector(`svg [data-id="${id}"]`)

    const x = parseInt(nodeEl?.getAttribute('x') || '', 10)
    const y = parseInt(nodeEl?.getAttribute('y') || '', 10)
    const width = parseInt(nodeEl?.getAttribute('width') || '', 10)
    const height = parseInt(nodeEl?.getAttribute('height') || '', 10)

    const mx = -x + window.innerWidth / 2 - width / 2
    const my = -y + window.innerHeight / 2 - height / 2

    assertNotNull(nodeEl)

    this.d3zoom.setTranslate({ x: mx, y: my })
  }
}
