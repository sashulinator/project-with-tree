import uniqid from 'uniqid'

import { Point } from '~/entities/point'
import { assertDefined } from '~/utils/core'

import { CanvasState, NodeListState, NodeState, getColumnX } from '..'

interface Props {
  canvasState: CanvasState
  nodeListState: NodeListState
}

export function addNode(props: Props): () => void {
  return (): void => {
    const rect = props.canvasState.ref.value?.getBoundingClientRect()
    assertDefined(rect)
    const point: Point = {
      type: 'SIFT',
      id: uniqid(),
      computation: 'successively',
      name: 'new',
      x: -props.canvasState.translate.value.x + rect?.width / 2 - 200,
      y: -props.canvasState.translate.value.y + rect?.height / 2 - 150,
    }
    const nodeState = new NodeState(point)
    props.nodeListState.add(nodeState)

    setTimeout(() => {
      nodeState.position.transitionMove({ x: getColumnX(nodeState.position.value.x), y: nodeState.position.value.y })
    })
  }
}
