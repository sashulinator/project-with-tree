import { TransitionMoveEvent } from '~/lib/emitter'
import { generateId } from '~/utils/core'
import { Events } from '~/utils/emitter'

import { CanvasController, NodeListController, NodeState, getColumnX } from '..'
import { Point } from '../../..'

interface Props {
  canvasController: CanvasController
  nodeListController: NodeListController
}

export function addNode(props: Props): () => void {
  return (point?: Partial<Point>, event?: TransitionMoveEvent & Events): void => {
    const position = props.canvasController.getPointPosition('bc')

    const newPoint: Point = {
      level: 'decisionPoint',
      computation: 'successively',
      name: 'new',
      xy: [position.x, position.y],
      ...point,
      id: point?.id ?? generateId(),
    }

    const nodeController = new NodeState(newPoint)
    props.nodeListController.add(nodeController)

    setTimeout(() => {
      nodeController.position.transitionMove(
        { x: getColumnX(nodeController.position.value.x), y: nodeController.position.value.y },
        { duration: 0, ...event }
      )
    }, 10)
  }
}
