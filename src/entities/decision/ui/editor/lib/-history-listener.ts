import { ActionHistory } from '~/utils/action-history'
import { Any } from '~/utils/core'

import { Controller, LinkListState, NodeListState } from '..'

type Props = {
  history: ActionHistory
  controller: Controller
  nodeListState: NodeListState
  linkListState: LinkListState
}

export function historyListener(props: Props): void {
  const { history, nodeListState } = props

  nodeListState.on('selection', (event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((event as Any).isHistory) return
    const action = (d: 'previous' | 'value') => (): void => nodeListState.selection.set(event[d], { isHistory: true })
    history.add(action('value'), action('previous'))
  })

  nodeListState.on('position', (event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((event as Any).isHistory || !event.last || event.isPositionColumn) return

    const value = { ...event.value }
    const undo = (): void => {
      event.item.position.transitionMove(event.previousStart, { isHistory: true })
    }
    const redo = (): void => {
      event.item.position.transitionMove(value, { isHistory: true })
    }
    history.add(redo, undo)
  })
}
