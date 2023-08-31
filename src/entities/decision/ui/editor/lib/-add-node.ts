import { Point } from '~/entities/point'
import { TransitionMoveEvent } from '~/lib/emitter'
import { generateId } from '~/utils/core'
import { Events } from '~/utils/emitter'

import { CanvasController, NodeListState, NodeState, getColumnX } from '..'

interface Props {
  canvasController: CanvasController
  nodeListState: NodeListState
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

    const nodeState = new NodeState(newPoint)
    props.nodeListState.add(nodeState)

    setTimeout(() => {
      nodeState.position.transitionMove(
        { x: getColumnX(nodeState.position.value.x), y: nodeState.position.value.y },
        { duration: 0, ...event }
      )
    }, 10)
  }
}
