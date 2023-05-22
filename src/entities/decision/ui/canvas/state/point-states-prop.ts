import { isLinkedNode } from '~/entities/decision'
import { Any, Id } from '~/utils/core'
import { Emitterable, EmitterableProp } from '~/utils/emitterable'
import { PointState } from '~/widgets/chart-item'

import { DecisionItem } from '../../../types/decision-item'

type PointStates = Record<Id, PointState>

export class PointStatesProp<N extends string> extends EmitterableProp<N, PointStates> {
  constructor(eventName: N, value: DecisionItem[], state: Emitterable<Any>) {
    const pointStates = value.reduce<PointStates>((acc, item) => {
      if (isLinkedNode(item)) return acc
      acc[item.id] = new PointState(item, { position: item, id: item.id, links: item.links })
      return acc
    }, {})

    super(eventName, pointStates, state)
  }
}
