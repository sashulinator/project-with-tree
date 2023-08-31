import { Id, assertNotNull } from '~/utils/core'
import { getElementSize } from '~/utils/dom/get-element-size'

import { CanvasController, NodeListController } from '..'

interface Props {
  nodeListController: NodeListController
  canvasController: CanvasController
}

export function centerNode(props: Props): (id: Id) => void {
  return (id) => {
    const nodeController = props.nodeListController.get(id)
    assertNotNull(nodeController.ref.value)
    assertNotNull(props.canvasController.ref.value)
    const nodeSize = getElementSize(nodeController.ref.value)
    const canvasSize = getElementSize(props.canvasController.ref.value)
    const mx = -nodeController.position.value.x + canvasSize.width / 2 - nodeSize.width / 2
    const my = -nodeController.position.value.y + canvasSize.height / 2 - nodeSize.height / 2
    props.canvasController.zoom.setZoom({ x: mx, y: my })
  }
}
