import { getElementSize } from '~/utils/dom'

import { CanvasState, NodeListState, getColumnX } from '..'

interface Props {
  canvasState: CanvasState
  nodeListState: NodeListState
  pasteFromClipboard: () => void
}

export function paste(props: Props): () => void {
  return () => {
    if (props.nodeListState.cutted.value.length > 0) {
      props.nodeListState.cutted.value.forEach((id, i) => {
        const nodeState = props.nodeListState.get(id)
        const canvasSize = getElementSize(props.canvasState.ref.value as Element)

        nodeState.position.transitionMove({
          x: getColumnX(
            (-props.canvasState.zoom.value.x + canvasSize?.width / 2) / props.canvasState.zoom.value.k - 150
          ),
          y: (-props.canvasState.zoom.value.y + canvasSize?.height / 2) / props.canvasState.zoom.value.k - 100 + i,
        })
      })
    } else {
      props.pasteFromClipboard()
    }
  }
}
