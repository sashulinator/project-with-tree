import { TransitionMoveEvent } from '~/lib/emitter'
import { generateId } from '~/utils/core'
import { Events } from '~/utils/emitter'

import { CanvasController, NodeController, NodeListController, getColumnX } from '..'
import { Point } from '../../..'

interface Props {
  canvas: CanvasController
  nodeList: NodeListController
}

export function addNode(props: Props): () => void {
  return (point?: Partial<Point>, event?: TransitionMoveEvent & Events): void => {
    const position = props.canvas.getPointPosition('bc')

    const newPoint: Point = {
      level: 'decisionPoint',
      computation: 'successively',
      name: 'new',
      xy: [position.x, position.y],
      ...point,
      id: point?.id ?? generateId(),
    }

    const node = new NodeController(newPoint)
    props.nodeList.add(node)

    setTimeout(() => {
      node.position.transitionMove(
        { x: getColumnX(node.position.value.x), y: node.position.value.y },
        { duration: 0, ...event }
      )
    }, 10)
  }
}
