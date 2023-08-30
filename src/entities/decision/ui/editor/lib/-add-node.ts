import { Point } from '~/entities/point'
import { generateId } from '~/utils/core'
import { getElementSize } from '~/utils/dom/get-element-size'

import { CanvasState, NodeListState, NodeState, getColumnX } from '..'

interface Props {
  canvasState: CanvasState
  nodeListState: NodeListState
}

export function addNode(props: Props): () => void {
  return (point?: Point): void => {
    const canvasSize = getElementSize(props.canvasState.ref.value as Element)

    const x = (-props.canvasState.zoom.value.x + canvasSize?.width / 2) / props.canvasState.zoom.value.k - 150
    const y = (-props.canvasState.zoom.value.y + canvasSize?.height / 2) / props.canvasState.zoom.value.k - 100

    const newPoint: Point = {
      level: 'decisionPoint',
      // id берем из приходящего point т.к. функция может быть вызвана при событии cut/paste
      id: generateId(),
      computation: 'successively',
      name: 'new',
      ...point,
      xy: [x, y],
    }

    const nodeState = new NodeState(newPoint)
    props.nodeListState.add(nodeState)

    setTimeout(() => {
      nodeState.position.transitionMove({ x: getColumnX(nodeState.position.value.x), y: nodeState.position.value.y })
    }, 10)
  }
}
