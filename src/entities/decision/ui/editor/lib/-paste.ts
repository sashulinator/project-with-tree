import { getElementSize } from '~/utils/dom'

import { CanvasController, NodeListState, getColumnX } from '..'

interface Props {
  canvasController: CanvasController
  nodeListState: NodeListState
  pasteFromClipboard: () => void
}

export function paste(props: Props): () => void {
  return () => {
    if (props.nodeListState.cutted.value.length > 0) {
      props.nodeListState.cutted.value.forEach((id, i) => {
        const nodeState = props.nodeListState.get(id)
        const canvasSize = getElementSize(props.canvasController.ref.value as Element)

        nodeState.position.transitionMove({
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
