import { Id } from '~/utils/core'

import { CanvasController, NodeListController } from '..'

interface Context {
  canvas: CanvasController
  nodeList: NodeListController
}

export function _centerNode(context: Context, id: Id): void {
  const { nodeList, canvas } = context
  const node = nodeList.get(id)
  const nodeSize = node.size
  const canvasSize = canvas.size
  const mx = -node.position.value.x + canvasSize.width / 2 - nodeSize.width / 2
  const my = -node.position.value.y + canvasSize.height / 2 - nodeSize.height / 2
  canvas.zoom.setZoom({ x: mx, y: my })
}
