import { GestureDragEvent } from '~/ui/canvas'
import { NodeState, getColumnX, getNodeMovement } from '../../..'
import { State } from '..'

export function onGestureDrag(state: State) {
  return (nodeState: NodeState) =>
    (event: GestureDragEvent): void => {
      event.event.stopPropagation()

      const movePosition = getNodeMovement(event, state.scale.value)
      if (movePosition === null) return

      const x = nodeState.position.start.x + movePosition.x
      const y = nodeState.position.start.y + movePosition.y

      !event.last
        ? nodeState.position.move({ x, y }, { last: false })
        : nodeState.position.transitionMove({ x: getColumnX(x), y })
    }
}
