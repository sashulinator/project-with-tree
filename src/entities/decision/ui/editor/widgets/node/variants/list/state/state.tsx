import { getStyle } from '~/utils/dom'
import { Point } from '~/entities/point'
import { Selection, EmitterableDictionary } from '~/lib/emitter'
import { Id, assertNotNull } from '~/utils/core'

import { NodeState } from '../../../../..'
import { NODE_GAP } from '../../..'

export type Events = {
  // Наследуемые события
  add: { state: NodeState }
  update: { state: NodeState }
  remove: { state: NodeState }
  // Уникальные события
  // ...
  selection: { value: Set<Id>; prev: Set<Id> }

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
      state.position.transitionedMove(state.position.value.x, nextY)
      const style = getStyle(state.ref.value)
      assertNotNull(style)
      const height = parseInt(style.height, 10)
      nextY += height + NODE_GAP
    })
  }
}
