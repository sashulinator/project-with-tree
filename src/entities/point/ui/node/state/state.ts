import { ItemState, ItemStateProps } from '~/abstract/canvas/ui/item/state'
import { Point } from '~/entities/point'
import { Rule } from '~/entities/rule'

import { Events } from './events'

// import { RuleListProp } from './rule-list-prop'

export interface StateProps extends ItemStateProps {
  ruleList?: Rule[] | undefined
}

export class PointState extends ItemState<Events> {
  point: Point

  // ruleList: RuleListProp<'setRuleList'>

  constructor(point: Point, props: StateProps) {
    super(props)

    this.point = point

    // this.ruleList = new RuleListProp('setRuleList', props.ruleList || [], this)
  }
}
