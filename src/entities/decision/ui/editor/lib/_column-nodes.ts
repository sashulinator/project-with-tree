import { Id } from '~/utils/core'

import { NODE_GAP, NodeListController } from '..'

interface Context {
  nodeList: NodeListController
}

export function _columnNodes(context: Context, ids: Id[], x: number): void {
  const { nodeList } = context

  const columnNodes = ids.map((id) => nodeList.get(id))

  // Вычисляем сумму высот всех нод в колонке
  const nodesHeight = columnNodes.reduce((acc, node) => {
    const size = node.size
    acc += size.height
    return acc
  }, 0)

  // Вычисляем высоту колонки
  const columnHeight = nodesHeight + columnNodes.length * NODE_GAP
  // Находим Y вершины колонки
  const columnTopY = columnHeight / -2

  // Двигаем все ноды колонки
  for (let i = 0, nextY = columnTopY; i < columnNodes.length; i++) {
    const node = columnNodes[i]
    node.position.transitionMove({ x, y: nextY }, { isPositionColumn: true })
    nextY += node.size.height + NODE_GAP
  }
}
