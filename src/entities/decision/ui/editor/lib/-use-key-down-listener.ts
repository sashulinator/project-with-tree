import { isActiveInput, keyListener } from '~/utils/dom-event'
import { useEventListener } from '~/utils/hooks'

import { HistoryController } from '../_private'

interface Actions {
  removeSelectedNodes: () => void
  resetAll: () => void
  copySelectedNodes: () => void
  cutSelectedNodes: () => void
  paste: () => void
}

export function useKeyDownListener(actions: Actions, history: HistoryController): void {
  const previousHistoryConf = { key: 'z', metaCtrlKey: true, shiftKey: false }
  useEventListener(
    'keydown',
    keyListener(previousHistoryConf, () => {
      history.undo()
    })
  )

  const nextHistoryConf = { key: 'z', metaCtrlKey: true, shiftKey: true }
  useEventListener(
    'keydown',
    keyListener(nextHistoryConf, () => {
      history.redo()
    })
  )

  const resetSelectionConf = { key: 'Escape' }
  useEventListener('keydown', keyListener(resetSelectionConf, EmitAction('resetAll')))

  const removeSelectedNodesConf = { key: 'Backspace' }
  useEventListener('keydown', keyListener(removeSelectedNodesConf, EmitAction('removeSelectedNodes')))

  const copySelectedNodesConf = { key: 'c', metaCtrlKey: true }
  useEventListener('keydown', keyListener(copySelectedNodesConf, EmitAction('copySelectedNodes')))

  const cutConf = { key: 'x', metaCtrlKey: true }
  useEventListener('keydown', keyListener(cutConf, EmitAction('cutSelectedNodes')))

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
