import { ItemState, ItemStateProps } from '~/abstract/canvas/ui/item/state'
import { Point } from '~/entities/point'
import { Id } from '~/utils/core'

import { Events } from './events'

// import { RuleListProp } from './rule-list-prop'

export interface StateProps {
  point: Point
}

export class PointState extends ItemState<Events> {
  point: Point

  // ruleList: RuleListProp<'setRuleList'>

  constructor(props: StateProps) {
    super({ id: props.point.id, position: props.point })

    this.point = props.point

    // this.ruleList = new RuleListProp('setRuleList', props.ruleList || [], this)
  }
}
