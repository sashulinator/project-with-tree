import { ItemState } from '~/abstract/canvas/ui/item/state'
import { Point } from '~/entities/point'

import { Events } from './events'

// import { RuleListProp } from './rule-list-prop'

export interface NodeStateProps {
  point: Point
}

export class NodeState extends ItemState<Events> {
  point: Point

  // ruleList: RuleListProp<'setRuleList'>

  constructor(props: NodeStateProps) {
    super({ id: props.point.id, position: props.point })

    this.point = props.point
  }
}
