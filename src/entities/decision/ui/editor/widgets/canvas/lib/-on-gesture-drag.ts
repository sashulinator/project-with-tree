import { GestureDragEvent } from '~/ui/canvas'
import { Id, Position } from '~/utils/core'

import { Controller } from '..'
import { NodeController, NodeListController, getColumnX, getNodeMovement } from '../../..'

/**
 * Функция обработки драга ноды
 * `Gesture` в названии отсылает к библиотечке @use-gesture/react
 * @param {Controller} state
 * @param {NodeController} nodeController
 * @param {GestureDragEvent} event событие библиотечки @use-gesture/react
 */
export function onGestureDrag(
  state: Controller,
  nodeListController: NodeListController,
  transitionMoveNodes: (ids: Id[], position: Position) => void
) {
  return (node: NodeController) =>
    (event: GestureDragEvent): void => {
      event.event.stopPropagation()

      const movePosition = getNodeMovement(event, state.zoom.value.k)
      if (movePosition === null) return

      // Начинаем двигать карточку только если movePosition больше 10
      // иначе карточка дергается при простом клике на нее
      if (Math.abs(movePosition.x) < 10 && Math.abs(movePosition.y) < 10) return

      if (!nodeListController.selection.isSelected(node.id)) {
        const x = node.position.start.x + movePosition.x
        const y = node.position.start.y + movePosition.y

        !event.last ? node.position.move({ x, y }, { last: false }) : transitionMoveNodes([node.id], { x, y })

        return
      }

      if (event.event.shiftKey) {
        const selectedNodeStates = nodeListController.selection.value.map((id) => nodeListController.get(id))

        const x = node.position.start.x + movePosition.x
        const y = node.position.start.y + movePosition.y

        !event.last
          ? node.position.move({ x, y }, { last: false })
          : transitionMoveNodes(nodeListController.selection.value, { x, y })

        !event.last
          ? selectedNodeStates
              .sort((a, b) => a.position.value.y - b.position.value.y)
              .forEach((selectedNode, i) => {
                selectedNode.position.move(
                  { x: node.position.value.x, y: node.position.value.y + i * 1 },
                  { last: false }
                )
              })
          : transitionMoveNodes(nodeListController.selection.value, {
              x: getColumnX(node.position.value.x),
              y: node.position.value.y,
            })
      } else {
        const selectedNodes = nodeListController.selection.value.map((id) => nodeListController.get(id))

        selectedNodes.forEach((selectedNode) => {
          const x = selectedNode.position.start.x + movePosition.x
          const y = selectedNode.position.start.y + movePosition.y

          !event.last
            ? selectedNode.position.move({ x, y }, { last: false })
            : transitionMoveNodes(nodeListController.selection.value, { x, y })
        })
      }
    }
}
