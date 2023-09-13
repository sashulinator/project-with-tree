import { Id, Position } from '~/utils/core'

import {
  // NODE_GAP,
  NodeListController,
} from '..'

interface Context {
  nodeList: NodeListController
}

export function _calcColumnNodesPositions(context: Context, ids: Id[], x: number): Record<Id, Position> {
  const { nodeList } = context
  const ret: Record<Id, Position> = {}
  const columnNodes = ids.map((id) => nodeList.get(id))
  // .sort((nodeA, nodeB) => nodeA.position.value.y - nodeB.position.value.y)

  // Вычисляем сумму высот всех нод в колонке
  // const nodesHeight = columnNodes.reduce((acc, node) => {
  //   const size = node.size
  //   acc += size.height
  //   return acc
  // }, 0)

  // Вычисляем высоту колонки
  // const columnHeight = nodesHeight + columnNodes.length * NODE_GAP
  // Находим Y вершины колонки
  // const columnTopY = columnHeight / -2

  // Двигаем все ноды колонки
  for (let i = 0; i < columnNodes.length; i++) {
    // for (let i = 0, nextY = columnTopY; i < columnNodes.length; i++) {
    const node = columnNodes[i]
    ret[node.id] = { x, y: node.position.value.y }
    // nextY += node.size.height + NODE_GAP
  }

  return ret
}
