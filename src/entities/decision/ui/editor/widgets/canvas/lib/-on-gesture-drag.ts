import { GestureDragEvent } from '~/ui/canvas'

import { Controller } from '..'
import { NodeListController, NodeState, getColumnX, getNodeMovement } from '../../..'

/**
 * Функция обработки драга ноды
 * `Gesture` в названии отсылает к библиотечке @use-gesture/react
 * @param {Controller} state
 * @param {NodeState} nodeController
 * @param {GestureDragEvent} event событие библиотечки @use-gesture/react
 */
export function onGestureDrag(state: Controller, nodeListController: NodeListController) {
  return (nodeController: NodeState) =>
    (event: GestureDragEvent): void => {
      event.event.stopPropagation()

      const movePosition = getNodeMovement(event, state.zoom.value.k)
      if (movePosition === null) return

      // Начинаем двигать карточку только если movePosition больше 10
      // иначе карточка дергается при простом клике на нее
      if (Math.abs(movePosition.x) < 10 && Math.abs(movePosition.y) < 10) return

      if (!nodeListController.selection.isSelected(nodeController.id)) {
        const x = nodeController.position.start.x + movePosition.x
        const y = nodeController.position.start.y + movePosition.y

        !event.last
          ? nodeController.position.move({ x, y }, { last: false })
          : nodeController.position.transitionMove({ x: getColumnX(x), y })

        return
      }

      if (event.event.shiftKey) {
        const selectedNodeStates = [...nodeListController.selection.value].map((id) => nodeListController.get(id))

        const x = nodeController.position.start.x + movePosition.x
        const y = nodeController.position.start.y + movePosition.y

        !event.last
          ? nodeController.position.move({ x, y }, { last: false })
          : nodeController.position.transitionMove({ x: getColumnX(x), y })

        selectedNodeStates
          .sort((a, b) => a.position.value.y - b.position.value.y)
          .forEach((selectedNodeState, i) => {
            !event.last
              ? selectedNodeState.position.move(
                  { x: nodeController.position.value.x, y: nodeController.position.value.y + i * 1 },
                  { last: false }
                )
              : selectedNodeState.position.transitionMove({
                  x: getColumnX(nodeController.position.value.x),
                  y: nodeController.position.value.y,
                })
          })
      } else {
        const selectedNodeStates = [...nodeListController.selection.value, nodeController.id].map((id) =>
          nodeListController.get(id)
        )

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
