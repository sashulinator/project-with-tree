import { Id, Position } from '~/utils/core'

import { NodeListController, getColumnX } from '..'
import { _columnNodes } from './_column-nodes'

interface Context {
  nodeList: NodeListController
}

export function _transitionMoveNodes(context: Context, ids: Id[], position: Position): void {
  const { nodeList } = context

  const columnX = getColumnX(position.x)

  const nodes = nodeList
    .values()
    // Собираем все ноды из будущей колонки
    .filter((node) => node.position.value.x === columnX || ids.includes(node.id))
    // Сортируем их сверху вних
    .sort((nodeA, nodeB) => nodeA.position.value.y - nodeB.position.value.y)

  _columnNodes(
    context,
    nodes.map((n) => n.id),
    columnX
  )
}
