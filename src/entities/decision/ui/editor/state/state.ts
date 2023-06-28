import { interpolateNumber, transition } from 'd3'

import { BoardEvents, BoardState, Position } from '~/abstract/canvas'
import { Decision } from '~/entities/decision/types/decision'
import { Id, assertNotNull } from '~/utils/core'
import { Prop } from '~/utils/emitter'

import { D3Prop } from './d3'
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

  d3: D3Prop<Events & BoardEvents>

  constructor(props: EditorStateProps) {
    super({ ...props })

    this.decision = props.decision

    this.name = new Prop('name', props.decision.name, this)

    this.selected = new SelectedProp('selected', [], this)

    this.d3 = new D3Prop(this)
  }

  centerNode = (id: Id, duration = 400, delay = 0): void => {
    const nodeEl = document.querySelector(`svg [data-id="${id}"]`)

    const x = parseInt(nodeEl?.getAttribute('x') || '', 10)
    const y = parseInt(nodeEl?.getAttribute('y') || '', 10)
    const mx = -x + window.innerWidth / 2
    const my = -y + window.innerHeight / 2

    assertNotNull(nodeEl)

    transition()
      .delay(delay)
      .duration(duration)
      .tween(
        'scroll',
        (() => () => {
          const ix = interpolateNumber(this.translate.value.x, mx)
          const iy = interpolateNumber(this.translate.value.y, my)

          return (t: number) => {
            this.translate.move(ix(t), iy(t), false)
          }
        })()
      )
  }
}
