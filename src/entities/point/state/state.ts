import mitt, { Emitter } from 'mitt'

import { Point } from '~/entities/point'
import { Rule } from '~/entities/rule'
import { Id } from '~/utils/core'
import { Emitterable, EmitterableProp } from '~/utils/emitterable'
import { Position } from '~/widgets/canvas/ui/item'

import { Events } from './events'
import { PositionProp } from './position-prop'
import { RuleListProp } from './rule-list-prop'

export interface StateProps {
  id: Id
  position: Position
  width?: number | undefined
  height?: number | undefined
  ruleList?: Rule[] | undefined
}

export class PointState implements Emitterable<Emitter<Events>> {
  emitter: Emitter<Events>

  id: Id

  position: PositionProp<'setPosition'>

  height: EmitterableProp<'setHeight', number>

  width: EmitterableProp<'setWidth', number>

  point: Point

  ref: EmitterableProp<'setRef', null | HTMLElement>

  ruleList: RuleListProp<'setRuleList'>

  constructor(point: Point, props: StateProps) {
    this.emitter = mitt()
    this.point = point

    this.id = props.id

    this.height = new EmitterableProp('setHeight', props.height || 0, this)
    this.width = new EmitterableProp('setWidth', props.width || 0, this)
    this.ref = new EmitterableProp<'setRef', null | HTMLElement>('setRef', null, this)

    this.position = new PositionProp('setPosition', props.position, this)
    this.ruleList = new RuleListProp('setRuleList', props.ruleList || [], this)
  }
}
