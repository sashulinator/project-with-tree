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
    const action = (d: 'prev' | 'value') => (): void => nodeListState.selection.set(event[d], { isHistory: true })
    history.add(action('value'), action('prev'))
  })

  // nodeListState.on('position', (event) => {
  //   if ((event as any).isHistory || !event.isLast || event.auto) return

  //   const last = { ...event.state.position.last }

  //   const undo = (): void => event.state.position.transitionedMove(last, { ...event, isHistory: true })
  //   const redo = (): void => event.state.position.transitionedMove(event.value, { ...event, isHistory: true })
  //   history.add(redo, undo)
  // })
}
