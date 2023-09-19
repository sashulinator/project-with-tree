import { TransitionMoveEvent } from '~/lib/emitter'
import { Events } from '~/utils/emitter'
import { fns } from '~/utils/function'
import { Required } from '~/utils/types/object'

import { CanvasController, NodeController, NodeListController, getColumnX } from '..'
import { Point } from '../../..'
import { _createPoint } from './_create-point'

interface Context {
  canvas: CanvasController
  nodeList: NodeListController
}

export function _addNode(
  context: Context,
  point: Required<Partial<Point>, 'level'>,
  onAdded: (node: NodeController) => void,
  event?: TransitionMoveEvent & Events
): Point {
  const { canvas, nodeList } = context

  const newPoint = _createPoint(context, point)

  const node = new NodeController(newPoint)

  nodeList.addOn(
    node,
    fns(onAdded, () => {
      node.position.transitionMove(
        { x: getColumnX(node.position.value.x), y: canvas.getPointPosition('cc').y },
        { duration: 0, ...event }
      )
    })
  )

  return newPoint
}
