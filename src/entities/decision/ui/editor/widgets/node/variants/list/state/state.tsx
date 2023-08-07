import { Point } from '~/entities/point'
import { Selection, EmitterableDictionary } from '~/lib/emitter'
import { Id } from '~/utils/core'

import { NodeState } from '../../../../..'

export type Events = {
  // Наследуемые события
  add: { state: NodeState }
  update: { state: NodeState }
  remove: { state: NodeState }
  // Уникальные события
  // ...
  selection: { value: Set<Id> }

  // События стейтов
  computation: { value: Point['computation']; state: NodeState }
  title: { value: string; state: NodeState }
}

export class State extends EmitterableDictionary<Events, NodeState> {
  selection: Selection<'selection'>

  constructor(pointList: Point[]) {
    const stateList = pointList.map((point) => new NodeState(point))
    super(stateList, (s) => s.id.toString())

    this.selection = new Selection('selection', new Set<Id>(), this)
  }
}
