import { ActionHistory } from '~/utils/action-history'

export function previousHistory(history: ActionHistory): () => void {
  return () => {
    history.previous()
  }
}
