import { Id } from '~/utils/core'

import { LinkListController, NodeListController } from '..'

interface Context {
  nodeList: NodeListController
  linkList: LinkListController
}

export function removeNode(context: Context, id: Id): void {
  const x = context.nodeList.get(id).position.value.x
  context.nodeList.remove(id)
  setTimeout(() => context.nodeList.positionColumn(x))
}
