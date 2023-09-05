import { CanvasController, NodeListController, getColumnX } from '..'

interface Context {
  canvas: CanvasController
  nodeList: NodeListController
  pasteFromClipboard: () => void
}

export function _paste(context: Context): void {
  const { nodeList, canvas, pasteFromClipboard } = context

  if (nodeList.cutted.value.length > 0) {
    nodeList.cutted.value.forEach((id, i) => {
      const node = nodeList.get(id)
      const canvasCenter = canvas.getPointPosition('cc')

      node.position.transitionMove({
        x: getColumnX((-canvas.zoom.value.x + canvasCenter?.x) / canvas.zoom.value.k - 150),
        y: (-canvas.zoom.value.y + canvasCenter?.y) / canvas.zoom.value.k - 100 + i,
      })
    })
  } else {
    pasteFromClipboard()
  }
}
