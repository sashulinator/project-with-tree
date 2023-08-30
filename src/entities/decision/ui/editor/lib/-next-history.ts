import { ActionHistory } from '~/utils/action-history'
import { Id } from '~/utils/core'

import { NodeListState } from '../widgets/canvas'

type Props = {
  history: ActionHistory
  // controller: Controller
  nodeListState: NodeListState
  // linkListState: LinkListState
}

export function nextHistory(props: Props): () => void {
  const { history, nodeListState } = props

  return () => {
    const next = history.findNext()
    if (next?.type === 'selection') {
      nodeListState.selection.set(next.redo.value as Id[], { isHistory: true })
      next.done = true
    }
  }
}
