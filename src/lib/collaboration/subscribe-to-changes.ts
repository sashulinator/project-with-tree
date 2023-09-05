import { getUsername } from '~/shared/username'
import { getJSON } from '~/utils/local-storage'

type Box<D> = {
  type: string
  username: string
  data: D
}

export function subscribeToChanges<T>(name: string, cb: (changes: Box<T>) => void, timeoutId?: number): () => void {
  const res = getJSON<Box<T>>(name)

  timeoutId = window.setTimeout(() => {
    subscribeToChanges(name, cb)
  }, 100)

  if (res !== null && res.username !== getUsername()) {
    cb(res)
    localStorage.removeItem(name)
  }

  return (): void => clearTimeout(timeoutId)
}
