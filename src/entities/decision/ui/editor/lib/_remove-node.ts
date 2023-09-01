import { Id } from '~/utils/core'

import { NodeListController } from '..'

interface Context {
  nodeList: NodeListController
}

export function _removeNode(context: Context, id: Id): void {
  const { nodeList } = context

  const x = nodeList.get(id).position.value.x
  nodeList.remove(id)
  setTimeout(() => nodeList.positionColumn(x))
}
