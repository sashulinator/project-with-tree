import { TransitionMoveEvent } from '~/lib/emitter'
import { generateId } from '~/utils/core'
import { Events } from '~/utils/emitter'
import { Required } from '~/utils/types/object'

import { CanvasController, NodeController, NodeListController, getColumnX } from '..'
import { Point } from '../../..'

interface Context {
  canvas: CanvasController
  nodeList: NodeListController
}

export function _addNode(
  context: Context,
  point: Required<Partial<Point>, 'level'>,
  event?: TransitionMoveEvent & Events
): Point {
  const { canvas, nodeList } = context

  const position = canvas.getPointPosition('bc')

  const newPoint: Point = {
    name: 'new',
    xy: [position.x, position.y],
    ...point,
    id: point?.id ?? generateId(),
  }

  const node = new NodeController(newPoint)
  nodeList.add(node)

  setTimeout(() => {
    node.position.transitionMove(
      { x: getColumnX(node.position.value.x), y: node.position.value.y },
      { duration: 0, ...event }
    )
  }, 10)

  return newPoint
}
