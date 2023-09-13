import { Point } from '~/entities/decision'
import { Selection } from '~/lib/emitter'
import {
  Id,
  Position, // assertNotNull
} from '~/utils/core'
// import { getStyle } from '~/utils/dom'
import { DictionaryEvents, EmitterDictionary, Prop } from '~/utils/emitter'

import {
  //  NODE_GAP,
  getColumnX,
} from '../../..'
import { NodeController } from '../../../../../../..'

export type Events = DictionaryEvents<NodeController> & {
  // Уникальные события
  // ...
  selection: { value: Id[]; previous: Id[] }
  cutted: { value: Id[]; previous: Id[] }
  searchQuery: { value: string }

  // События стейтов
  computation: { value: Point['computation']; item: NodeController }
  title: { value: string; item: NodeController }
  position: {
    value: Position
    previous: Position
    start: Position
    previousStart: Position
    last: boolean
    item: NodeController
    // true если метод set вызван из функции positionColumn
    // TODO назвать как-то по другому
    isPositionColumn: boolean
  }
}

export class Controller extends EmitterDictionary<NodeController, Events> {
  selection: Selection<'selection'>

  cutted: Selection<'cutted'>

  searchQuery: Prop<'searchQuery', string>

  constructor(pointList: Point[]) {
    const stateList = pointList.map((point) => new NodeController(point))
    super(stateList, (s) => s.id.toString())

    this.selection = new Selection('selection', [] as Id[], this)

    this.cutted = new Selection('cutted', [] as Id[], this)

    this.searchQuery = new Prop('searchQuery', '', this)
  }

  addOn = (
    item: NodeController,
    on: (item: NodeController) => void,
    event?: Record<string, unknown> | undefined
  ): void => {
    this.add(item, event)
    item.on('ref', function cb() {
      on(item)
      item.off('ref', cb)
    })
  }

  getColumnNodes = (isNew: boolean): Record<number, NodeController[]> => {
    return this.values().reduce<Record<number, NodeController[]>>((acc, node) => {
      const x = isNew ? getColumnX(node.position.value.x) : node.position.start.x
      if (!acc[x]) acc[x] = []
      acc[x].push(node)
      return acc
    }, {})
  }

  // positionColumn(x: number): void {
  //   const columnNodes = this.values()
  //     .filter((state) => state.position.value.x === x)
  //     .sort((a, b) => a.position.value.y - b.position.value.y)

  //   const nodesHeight = columnNodes.reduce((acc, state) => {
  //     const style = getStyle(state.ref.value)
  //     assertNotNull(style)
  //     const height = parseInt(style.height, 10)
  //     acc += height
  //     return acc
  //   }, 0)

  //   const depthHeight = nodesHeight + columnNodes.length * NODE_GAP
  //   const depthTop = depthHeight / -2

  //   let nextY = depthTop

  //   columnNodes.forEach((state) => {
  //     state.position.transitionMove({ x: state.position.value.x, y: nextY }, { isPositionColumn: true })
  //     const style = getStyle(state.ref.value)
  //     assertNotNull(style)
  //     const height = parseInt(style.height, 10)
  //     nextY += height + NODE_GAP
  //   })
  // }
}
