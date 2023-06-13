import { BoardState, Position } from '~/abstract/canvas'

import { Events } from './events'
import { SelectedProp } from './selected-prop'

export interface EditorStateProps {
  translate: Position
  scale: number
}

export class EditorState extends BoardState<Events> {
  selected: SelectedProp<'selected'>

  constructor(props: EditorStateProps) {
    super({ ...props })

    this.selected = new SelectedProp('selected', [], this)
  }
}
