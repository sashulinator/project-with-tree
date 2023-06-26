import { BoardState, Position } from '~/abstract/canvas'
import { Decision } from '~/entities/decision/types/decision'
import { Id } from '~/utils/core'
import { getStyle } from '~/utils/dom'
import { Prop } from '~/utils/emitter'

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

  constructor(props: EditorStateProps) {
    super({ ...props })

    this.decision = props.decision

    this.name = new Prop('name', props.decision.name, this)

    this.selected = new SelectedProp('selected', [], this)
  }

  centerNode = (id: Id): void => {
    const nodeEl = document.querySelector(`svg [data-id="${id}"]`)
    const x = parseInt(nodeEl?.getAttribute('x') || '', 10)
    const y = parseInt(nodeEl?.getAttribute('y') || '', 10)
    this.translate.value = { x: x - window.innerWidth / 2, y: y - window.innerHeight / 2 }
  }
}
