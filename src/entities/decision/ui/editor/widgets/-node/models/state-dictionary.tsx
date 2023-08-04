import { EmitterableDictionary } from '~/lib/emitter/dictionary'

import { State } from './state'
import { Point } from '~/entities/point'

export type DictionaryEvents = {
  // Наследуемые события
  add: { state: State }
  update: { state: State }
  remove: { state: State }
  // Уникальные события
  // ...

  // События стейтов
  computation: { value: Point['computation']; state: State }
  title: { value: string; state: State }
}

export class StateDictionary extends EmitterableDictionary<DictionaryEvents, State> {
  constructor(pointList: Point[]) {
    const stateList = pointList.map((point) => new State(point))
    super(stateList, (s) => s.id.toString())
  }
}
