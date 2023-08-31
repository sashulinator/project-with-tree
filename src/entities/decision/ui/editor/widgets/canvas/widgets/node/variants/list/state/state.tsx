import { Point } from '~/entities/point'
import { Selection } from '~/lib/emitter'
import { Id, Position, assertNotNull } from '~/utils/core'
import { getStyle } from '~/utils/dom'
import { DictionaryEvents, EmitterDictionary, Prop } from '~/utils/emitter'

import { NODE_GAP } from '../../..'
import { NodeState } from '../../../../../../..'

export type Events = DictionaryEvents<NodeState> & {
  // Уникальные события
  // ...
  selection: { value: Id[]; previous: Id[] }
  cutted: { value: Id[]; previous: Id[] }
  searchQuery: { value: string }

  // События стейтов
  computation: { value: Point['computation']; item: NodeState }
  title: { value: string; item: NodeState }
  position: {
    value: Position
    previous: Position
    start: Position
    previousStart: Position
    last: boolean
    item: NodeState
    // true если метод set вызван из функции positionColumn
    // TODO назвать как-то по другому
    isPositionColumn: boolean
  }
}

export class Controller extends EmitterDictionary<NodeState, Events> {
  selection: Selection<'selection'>

  cutted: Selection<'cutted'>

  searchQuery: Prop<'searchQuery', string>

  constructor(pointList: Point[]) {
    const stateList = pointList.map((point) => new NodeState(point))
    super(stateList, (s) => s.id.toString())

    this.selection = new Selection('selection', [] as Id[], this)

    this.cutted = new Selection('cutted', [] as Id[], this)

    this.searchQuery = new Prop('searchQuery', '', this)
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
