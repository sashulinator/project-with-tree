import { ActionHistory } from '~/utils/action-history'

export function nextHistory(history: ActionHistory): () => void {
  return () => {
    history.next()
  }
}
