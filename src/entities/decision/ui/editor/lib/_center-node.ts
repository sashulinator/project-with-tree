import { Id } from '~/utils/core'

import { CanvasController, NodeListController } from '..'

interface Context {
  canvas: CanvasController
  nodeList: NodeListController
}

export function centerNode(context: Context, id: Id): void {
  const node = context.nodeList.get(id)
  const nodeSize = node.size
  const canvasSize = context.canvas.size
  const mx = -node.position.value.x + canvasSize.width / 2 - nodeSize.width / 2
  const my = -node.position.value.y + canvasSize.height / 2 - nodeSize.height / 2
  context.canvas.zoom.setZoom({ x: mx, y: my })
}
