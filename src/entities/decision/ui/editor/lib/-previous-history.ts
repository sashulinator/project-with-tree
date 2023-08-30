import { ActionHistory } from '~/utils/action-history'
import { Id } from '~/utils/core'

import { NodeListState } from '../widgets/canvas'

type Props = {
  history: ActionHistory
  // controller: Controller
  nodeListState: NodeListState
  // linkListState: LinkListState
}

export function previousHistory(props: Props): () => void {
  const { history, nodeListState } = props

  return () => {
    const current = history.findCurrent()
    if (current?.type === 'selection') {
      nodeListState.selection.set(current.undo.value as Id[], { isHistory: true })
      current.done = false
    }
  }
}
