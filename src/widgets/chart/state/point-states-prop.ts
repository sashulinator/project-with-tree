import { LinkedDecision, isLinkedNode } from '~/entities/decision'
import { Point } from '~/entities/point'
import { Id } from '~/utils/core'
import { BaseEmittableState, EmittableProp } from '~/utils/emittable-state'
import { State as ItemState } from '~/widgets/chart-item'

export class PointStatesProp<N extends string> extends EmittableProp<N, Record<Id, ItemState<Point>>> {
  constructor(eventName: N, value: (Point | LinkedDecision)[], state: BaseEmittableState) {
    const pointStates = value.reduce<Record<Id, ItemState<Point>>>((acc, item) => {
      if (isLinkedNode(item)) return acc
      acc[item.id] = new ItemState(item, { position: item, id: item.id, links: item.links })
      return acc
    }, {})

    super(eventName, pointStates, state)
  }
}
