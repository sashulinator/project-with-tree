import { Id, assertNotNull } from '~/utils/core'
import { getElementSize } from '~/utils/dom/get-element-size'

import { CanvasController, NodeListState } from '..'

interface Props {
  nodeListState: NodeListState
  canvasController: CanvasController
}

export function centerNode(props: Props): (id: Id) => void {
  return (id) => {
    const nodeState = props.nodeListState.get(id)
    assertNotNull(nodeState.ref.value)
    assertNotNull(props.canvasController.ref.value)
    const nodeSize = getElementSize(nodeState.ref.value)
    const canvasSize = getElementSize(props.canvasController.ref.value)
    const mx = -nodeState.position.value.x + canvasSize.width / 2 - nodeSize.width / 2
    const my = -nodeState.position.value.y + canvasSize.height / 2 - nodeSize.height / 2
    props.canvasController.zoom.setZoom({ x: mx, y: my })
  }
}
