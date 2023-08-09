import { GestureDragEvent } from '~/ui/canvas'
import { NodeState, getColumnX, getNodeMovement } from '../../..'
import { State } from '..'

/**
 * Функция обработки драга ноды
 * `Gesture` в названии отсылает к библиотечке @use-gesture/react
 * @param {State} state
 * @param {NodeState} nodeState
 * @param {GestureDragEvent} event событие библиотечки @use-gesture/react
 */
export function onGestureDrag(state: State) {
  return (nodeState: NodeState) =>
    (event: GestureDragEvent): void => {
      event.event.stopPropagation()

      const movePosition = getNodeMovement(event, state.scale.value)
      if (movePosition === null) return

      // Начинаем двигать карточку только если movePosition больше 10
      // иначе карточка дергается при простом клике на нее
      if (Math.abs(movePosition.x) < 10 && Math.abs(movePosition.y) < 10) return

      const x = nodeState.position.start.x + movePosition.x
      const y = nodeState.position.start.y + movePosition.y

      !event.last
        ? nodeState.position.move({ x, y }, { last: false })
        : nodeState.position.transitionMove({ x: getColumnX(x), y })
    }
}
