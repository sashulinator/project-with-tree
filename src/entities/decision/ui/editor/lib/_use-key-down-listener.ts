import { isActiveInput, keyListener } from '~/utils/dom-event'
import { useEventListener } from '~/utils/hooks'

interface Actions {
  removeSelected: () => void
  reset: () => void
  copySelected: () => void
  cutSelected: () => void
  paste: () => void
  redo: () => void
  undo: () => void
}

export function _useKeyDownListener(actions: Actions): void {
  const previousHistoryConf = { key: 'z', metaCtrlKey: true, shiftKey: false }
  useEventListener('keydown', keyListener(previousHistoryConf, EmitAction('undo')))

  const nextHistoryConf = { key: 'z', metaCtrlKey: true, shiftKey: true }
  useEventListener('keydown', keyListener(nextHistoryConf, EmitAction('redo')))

  const resetSelectionConf = { key: 'Escape' }
  useEventListener('keydown', keyListener(resetSelectionConf, EmitAction('reset')))

  const removeSelectedNodesConf = { key: 'Backspace' }
  useEventListener('keydown', keyListener(removeSelectedNodesConf, EmitAction('removeSelected')))

  const copySelectedNodesConf = { key: 'c', metaCtrlKey: true }
  useEventListener('keydown', keyListener(copySelectedNodesConf, EmitAction('copySelected')))

  const cutConf = { key: 'x', metaCtrlKey: true }
  useEventListener('keydown', keyListener(cutConf, EmitAction('cutSelected')))

  const pasteConf = { key: 'v', metaCtrlKey: true }
  useEventListener('keydown', keyListener(pasteConf, EmitAction('paste')))

  // Private

  function EmitAction(actionName: keyof Actions): (event: KeyboardEvent) => void {
    return (event: KeyboardEvent) => {
      if (isActiveInput()) return
      actions[actionName]()
      event.preventDefault()
    }
  }
}
