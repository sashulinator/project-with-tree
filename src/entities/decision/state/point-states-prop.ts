import { isLinkedNode } from '~/entities/decision'
import { Point } from '~/entities/point'
import { Id } from '~/utils/core'
import { BaseEmittableState, EmittableProp } from '~/utils/emittable-state'
import { PointState } from '~/widgets/chart-item'

import { DecisionItem } from '../types/decision-item'

type PointStates = Record<Id, PointState<Point>>

export class PointStatesProp<N extends string> extends EmittableProp<N, PointStates> {
  constructor(eventName: N, value: DecisionItem[], state: BaseEmittableState) {
    const pointStates = value.reduce<PointStates>((acc, item) => {
      if (isLinkedNode(item)) return acc
      acc[item.id] = new PointState(item, { position: item, id: item.id, links: item.links })
      return acc
    }, {})

    super(eventName, pointStates, state)
  }
}
