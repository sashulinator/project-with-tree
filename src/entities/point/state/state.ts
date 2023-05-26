import mitt, { Emitter } from 'mitt'

import { Point } from '~/entities/point'
import { Rule } from '~/entities/rule'
import { Id } from '~/utils/core'
import { Emitterable } from '~/utils/emitterable'
import { Position } from '~/widgets/chart-item'

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

export class PointState implements Emitterable<Events> {
  emitter: Emitter<Events>

  id: Id

  position: PositionProp<'setPosition'>

  height: number

  width: number

  point: Point

  ref: { current: null | HTMLElement }

  ruleList: RuleListProp<'setRuleList'>

  constructor(point: Point, props: StateProps) {
    this.emitter = mitt()
    this.point = point
    this.subscribe()

    this.id = props.id
    this.height = props.width || 0
    this.width = props.height || 0
    this.ref = { current: null }

    this.position = new PositionProp('setPosition', props.position, this)
    this.ruleList = new RuleListProp('setRuleList', props.ruleList || [], this)
  }

  private subscribe = (): void => {
    this.emitter.on('setWidth', (event) => {
      this.width = event.width
    })
    this.emitter.on('setHeight', (event) => {
      this.height = event.height
    })
    this.emitter.on('setRef', (event) => {
      this.ref.current = event.element
    })
  }

  setWidth = (width: number): void => {
    this.emitter.emit('setWidth', { width })
  }

  setHeight = (height: number): void => {
    this.emitter.emit('setHeight', { height })
  }

  setRef = (element: HTMLElement): void => {
    if (element === this.ref.current) return
    this.emitter.emit('setRef', { element })
  }
}
