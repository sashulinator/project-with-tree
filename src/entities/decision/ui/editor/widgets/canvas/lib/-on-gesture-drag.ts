import { GestureDragEvent } from '~/ui/canvas'
import { Id } from '~/utils/core'

import { Controller } from '..'
import { NodeController, NodeListController, getNodeMovement } from '../../..'

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
  transitionMoveNodes: (ids: Id[]) => void
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

        event.last ? transitionMoveNodes([node.id]) : node.position.move({ x, y }, { last: false })

        return
      }

      if (event.event.shiftKey) {
        const selectedNodeStates = nodeListController.selection.value.map((id) => nodeListController.get(id))

        const x = node.position.start.x + movePosition.x
        const y = node.position.start.y + movePosition.y

        event.last
          ? transitionMoveNodes(nodeListController.selection.value)
          : node.position.move({ x, y }, { last: false })

        event.last
          ? transitionMoveNodes(nodeListController.selection.value)
          : selectedNodeStates
              .sort((a, b) => a.position.value.y - b.position.value.y)
              .forEach((selectedNode, i) => {
                selectedNode.position.move(
                  { x: node.position.value.x, y: node.position.value.y + i * 1 },
                  { last: false }
                )
              })
      } else {
        const selectedNodes = nodeListController.selection.value.map((id) => nodeListController.get(id))

        event.last
          ? transitionMoveNodes(nodeListController.selection.value)
          : selectedNodes.forEach((selectedNode) => {
              const x = selectedNode.position.start.x + movePosition.x
              const y = selectedNode.position.start.y + movePosition.y
              selectedNode.position.move({ x, y }, { last: false })
            })
      }
    }
}
