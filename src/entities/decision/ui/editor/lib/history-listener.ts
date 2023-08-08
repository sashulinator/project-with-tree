// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { LinkListState, NodeListState, State } from '..'
import { ActionHistory } from '~/utils/action-history'

type Props = {
  history: ActionHistory
  state: State
  nodeListState: NodeListState
  linkListState: LinkListState
}

export function historyListener(props: Props): void {
  const { history, nodeListState } = props

  nodeListState.on('selection', (event) => {
    if ((event as any).isHistory) return
    const action = (d: 'previous' | 'value') => (): void => nodeListState.selection.set(event[d], { isHistory: true })
    history.add(action('value'), action('previous'))
  })

  nodeListState.on('position', (event) => {
    if ((event as any).isHistory || !event.last || event.isPositionColumn) return

    const value = { ...event.value }
    const undo = (): void => {
      event.state.position.transitionMove(event.previousStart, { isHistory: true })
    }
    const redo = (): void => {
      event.state.position.transitionMove(value, { isHistory: true })
    }
    history.add(redo, undo)
  })
}
