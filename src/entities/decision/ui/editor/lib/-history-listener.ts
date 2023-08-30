import { ActionHistory } from '~/utils/action-history'
import { has } from '~/utils/core'

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
    if (isHistory(event)) return

    history.add({
      storeLocally: true,
      redo: { value: event.value },
      undo: { value: event.previous },
      done: true,
      username: 'username',
      type: 'selection',
    })
  })
  // nodeListState.on('position', (event) => {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //   if ((event as Any).isHistory || !event.last || event.isPositionColumn) return
  //   const value = { ...event.value }
  //   const undo = (): void => {
  //     event.item.position.transitionMove(event.previousStart, { isHistory: true })
  //   }
  //   const redo = (): void => {
  //     event.item.position.transitionMove(value, { isHistory: true })
  //   }
  //   history.add(redo, undo)
  // })
}

function isHistory(event: unknown): boolean {
  return has(event, 'isHistory') && Boolean(event.isHistory)
}
