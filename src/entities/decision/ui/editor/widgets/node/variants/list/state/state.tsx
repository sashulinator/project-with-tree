import { EmitterableDictionary } from '~/lib/emitter/dictionary'

import { NodeState } from '../../../../..'
import { Point } from '~/entities/point'

export type Events = {
  // Наследуемые события
  add: { state: NodeState }
  update: { state: NodeState }
  remove: { state: NodeState }
  // Уникальные события
  // ...

  // События стейтов
  computation: { value: Point['computation']; state: NodeState }
  title: { value: string; state: NodeState }
}

export class State extends EmitterableDictionary<Events, NodeState> {
  constructor(pointList: Point[]) {
    const stateList = pointList.map((point) => new NodeState(point))
    super(stateList, (s) => s.id.toString())
  }
}
