import { Point } from '~/entities/point'
import { EmitterableDictionary, Selection } from '~/lib/emitter'
import { Id, Position, assertNotNull } from '~/utils/core'
import { getStyle } from '~/utils/dom'

import { NODE_GAP } from '../../..'
import { NodeState } from '../../../../..'

export type Events = {
  // Наследуемые события
  add: { state: NodeState }
  update: { state: NodeState }
  remove: { state: NodeState }
  // Уникальные события
  // ...
  selection: { value: Set<Id>; previous: Set<Id> }

  // События стейтов
  computation: { value: Point['computation']; state: NodeState }
  title: { value: string; state: NodeState }
  position: {
    value: Position
    previous: Position
    start: Position
    previousStart: Position
    last: boolean
    state: NodeState
    // true если метод set вызван из функции positionColumn
    // TODO назвать как-то по другому
    isPositionColumn: boolean
  }
}

export class State extends EmitterableDictionary<Events, NodeState> {
  selection: Selection<'selection'>

  constructor(pointList: Point[]) {
    const stateList = pointList.map((point) => new NodeState(point))
    super(stateList, (s) => s.id.toString())

    this.selection = new Selection('selection', new Set<Id>(), this)
  }

  positionColumn(x: number): void {
    const columnNodes = this.values()
      .filter((state) => state.position.value.x === x)
      .sort((a, b) => a.position.value.y - b.position.value.y)

    const nodesHeight = columnNodes.reduce((acc, state) => {
      const style = getStyle(state.ref.value)
      assertNotNull(style)
      const height = parseInt(style.height, 10)
      acc += height
      return acc
    }, 0)

    const depthHeight = nodesHeight + columnNodes.length * NODE_GAP
    const depthTop = depthHeight / -2

    let nextY = depthTop

    columnNodes.forEach((state) => {
      state.position.transitionMove({ x: state.position.value.x, y: nextY }, { isPositionColumn: true })
      const style = getStyle(state.ref.value)
      assertNotNull(style)
      const height = parseInt(style.height, 10)
      nextY += height + NODE_GAP
    })
  }
}
