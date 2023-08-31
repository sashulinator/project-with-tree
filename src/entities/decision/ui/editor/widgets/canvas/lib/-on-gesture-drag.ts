import { GestureDragEvent } from '~/ui/canvas'

import { Controller } from '..'
import { NodeListState, NodeState, getColumnX, getNodeMovement } from '../../..'

/**
 * Функция обработки драга ноды
 * `Gesture` в названии отсылает к библиотечке @use-gesture/react
 * @param {Controller} state
 * @param {NodeState} nodeState
 * @param {GestureDragEvent} event событие библиотечки @use-gesture/react
 */
export function onGestureDrag(state: Controller, nodeListState: NodeListState) {
  return (nodeState: NodeState) =>
    (event: GestureDragEvent): void => {
      event.event.stopPropagation()

      const movePosition = getNodeMovement(event, state.zoom.value.k)
      if (movePosition === null) return

      // Начинаем двигать карточку только если movePosition больше 10
      // иначе карточка дергается при простом клике на нее
      if (Math.abs(movePosition.x) < 10 && Math.abs(movePosition.y) < 10) return

      if (!nodeListState.selection.isSelected(nodeState.id)) {
        const x = nodeState.position.start.x + movePosition.x
        const y = nodeState.position.start.y + movePosition.y

        !event.last
          ? nodeState.position.move({ x, y }, { last: false })
          : nodeState.position.transitionMove({ x: getColumnX(x), y })

        return
      }

      if (event.event.shiftKey) {
        const selectedNodeStates = [...nodeListState.selection.value].map((id) => nodeListState.get(id))

        const x = nodeState.position.start.x + movePosition.x
        const y = nodeState.position.start.y + movePosition.y

        !event.last
          ? nodeState.position.move({ x, y }, { last: false })
          : nodeState.position.transitionMove({ x: getColumnX(x), y })

        selectedNodeStates
          .sort((a, b) => a.position.value.y - b.position.value.y)
          .forEach((selectedNodeState, i) => {
            !event.last
              ? selectedNodeState.position.move(
                  { x: nodeState.position.value.x, y: nodeState.position.value.y + i * 1 },
                  { last: false }
                )
              : selectedNodeState.position.transitionMove({
                  x: getColumnX(nodeState.position.value.x),
                  y: nodeState.position.value.y,
                })
          })
      } else {
        const selectedNodeStates = [...nodeListState.selection.value, nodeState.id].map((id) => nodeListState.get(id))

        selectedNodeStates.forEach((selectedNodeState) => {
          const x = selectedNodeState.position.start.x + movePosition.x
          const y = selectedNodeState.position.start.y + movePosition.y

          !event.last
            ? selectedNodeState.position.move({ x, y }, { last: false })
            : selectedNodeState.position.transitionMove({ x: getColumnX(x), y })
        })
      }
    }
}
