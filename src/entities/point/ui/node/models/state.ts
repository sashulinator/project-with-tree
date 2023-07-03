import { ItemEvents } from '~/abstract/canvas/widgets/item'
import { ItemState } from '~/abstract/canvas/widgets/item/state'
import { Point } from '~/entities/point'
import { Prop } from '~/utils/emitter'

export type Events = ItemEvents & {
  computation: { value: Point['computation'] }
  title: { value: string }
}

// import { RuleListProp } from './rule-list-prop'

export interface NodeStateProps {
  point: Point
}

export class NodeState extends ItemState<Events> {
  point: Point

  computation: Prop<'computation', 'parallel' | 'successively' | undefined>

  title: Prop<'title', string>

  description: Prop<'description', string | undefined>

  // ruleList: RuleListProp<'setRuleList'>

  constructor(props: NodeStateProps) {
    super({ id: props.point.id, position: props.point })

    this.point = props.point

    this.title = new Prop('title', props.point.name, this)

    this.description = new Prop('description', props.point.description, this)

    this.computation = new Prop('computation', props.point.computation, this)
  }
}
