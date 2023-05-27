import { CanvasState, isLinkedNode } from '~/entities/decision'
import { EventNames, Events, PointState } from '~/entities/point'
import { Any, Id } from '~/utils/core'
import { get } from '~/utils/dictionary'
import { EmitterableProp } from '~/utils/emitterable'

import { DecisionItem } from '../../../types/decision-item'

type PointStates = Record<Id, PointState>

export class PointStatesProp<N extends string> extends EmitterableProp<N, PointStates> {
  constructor(eventName: N, value: DecisionItem[], canvasState: CanvasState) {
    const pointStates = value.reduce<PointStates>((acc, item) => {
      if (isLinkedNode(item)) return acc
      const state = new PointState(item, { position: item, id: item.id, ruleList: item.rules })
      acc[item.id] = state
      state.emitter.on('*', (eventName, event) =>
        canvasState.emitter.emit(eventName as Any, { pointStateId: item.id, ...(event as Any) })
      )
      return acc
    }, {})

    super(eventName, pointStates, canvasState)
  }

  emit = <E extends EventNames>(id: Id, eventName: E, event: Events[E]): void => {
    const state = this.get(id)
    state.emitter.emit(eventName, event)
  }

  get = (id: Id): PointState => {
    return get(this.value, id)
  }
}
