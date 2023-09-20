import { TransitionMoveEvent } from '~/lib/emitter'
import { Events } from '~/utils/emitter'
import { fns } from '~/utils/function'

import { CanvasController, NodeController, NodeListController, getColumnX } from '..'

interface Context {
  canvas: CanvasController
  nodeList: NodeListController
}

export function _addNode(
  context: Context,
  node: NodeController,
  onAdded: (node: NodeController) => void,
  event?: TransitionMoveEvent & Events
): void {
  const { canvas, nodeList } = context

  nodeList.addOn(
    node,
    fns(onAdded, () => {
      node.position.transitionMove(
        { x: getColumnX(node.position.value.x), y: canvas.getPointPosition('cc').y },
        { duration: 0, ...event }
      )
    })
  )
}
