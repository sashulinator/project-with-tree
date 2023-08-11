import { isActiveInput, keyListener } from '~/utils/dom-event'
import { useEventListener } from '~/utils/hooks'

interface Actions {
  removeSelected: () => void
  resetSelection: () => void
  previousHistory: () => void
  nextHistory: () => void
}

export function useKeyDownListener(actions: Actions): void {
  const previousHistoryConf = { key: 'z', metaCtrlKey: true, shiftKey: false }
  useEventListener('keydown', keyListener(previousHistoryConf, EmitAction('previousHistory')))

  const nextHistoryConf = { key: 'z', metaCtrlKey: true, shiftKey: true }
  useEventListener('keydown', keyListener(nextHistoryConf, EmitAction('nextHistory')))

  const resetSelectionConf = { key: 'Escape' }
  useEventListener('keydown', keyListener(resetSelectionConf, EmitAction('resetSelection')))

  const removeSelectedConf = { key: 'Backspace' }
  useEventListener('keydown', keyListener(removeSelectedConf, EmitAction('removeSelected')))

  // Private

  function EmitAction(actionName: keyof Actions): (event: KeyboardEvent) => void {
    return (event: KeyboardEvent) => {
      if (isActiveInput()) return
      actions[actionName]()
      event.preventDefault()
    }
  }
}
