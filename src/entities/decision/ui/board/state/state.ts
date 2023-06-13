import { BoardState, Position } from '~/abstract/canvas'
import { Decision } from '~/entities/decision'
import { PointState } from '~/entities/point'
import { EmitterableProp as Prop } from '~/utils/emitter'

import { Events } from './events'
import { SelectedProp } from './selected-prop'

export interface DecisionStateProps {
  decision: Decision
  translate: Position
  scale: number
}

export class DecisionState extends BoardState<Events> {
  selected: SelectedProp<'selected'>

  constructor(props: DecisionStateProps) {
    super({ ...props })

    this.selected = new SelectedProp('selected', [], this)
  }
}
