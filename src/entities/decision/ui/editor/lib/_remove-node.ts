import { Id } from '~/utils/core'

import { CanvasController, NodeListController } from '..'

interface Context {
  canvas: CanvasController
  nodeList: NodeListController
}

export function _removeNode(context: Context, id: Id): void {
  const { nodeList } = context

  nodeList.remove(id)
}
