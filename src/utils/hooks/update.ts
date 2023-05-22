import { Update, useForceUpdate } from './force-update'

export type { Update }

export function useUpdate(cb: (update: Update) => void) {
  const update = useForceUpdate()
  cb(update)
}
