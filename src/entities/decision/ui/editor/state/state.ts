import { BoardState, Position } from '~/abstract/canvas'
import { Decision } from '~/entities/decision/types/decision'
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

    console.log('props.decision.name', props.decision)

    this.decision = props.decision

    this.name = new Prop('name', props.decision.name, this)

    this.selected = new SelectedProp('selected', [], this)
  }
}
