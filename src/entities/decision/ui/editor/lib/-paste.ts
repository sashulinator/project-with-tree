import { getElementSize } from '~/utils/dom'

import { CanvasController, NodeListController, getColumnX } from '..'

interface Props {
  canvasController: CanvasController
  nodeListController: NodeListController
  pasteFromClipboard: () => void
}

export function paste(props: Props): () => void {
  return () => {
    if (props.nodeListController.cutted.value.length > 0) {
      props.nodeListController.cutted.value.forEach((id, i) => {
        const nodeController = props.nodeListController.get(id)
        const canvasSize = getElementSize(props.canvasController.ref.value as Element)

        nodeController.position.transitionMove({
          x: getColumnX(
            (-props.canvasController.zoom.value.x + canvasSize?.width / 2) / props.canvasController.zoom.value.k - 150
          ),
          y:
            (-props.canvasController.zoom.value.y + canvasSize?.height / 2) / props.canvasController.zoom.value.k -
            100 +
            i,
        })
      })
    } else {
      props.pasteFromClipboard()
    }
  }
}
