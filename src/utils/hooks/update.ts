import { useEffect, useMemo } from 'react'

import { Update, useForceUpdate } from './force-update'

export type { Update }

export function useUpdate(cb: (update: Update, unsubscribes: (() => void)[]) => void, deps: unknown[] = []) {
  const unsubscribes: (() => void)[] = useMemo(() => [], deps)
  const update = useForceUpdate()

  useEffect(() => {
    cb(update, unsubscribes)
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe())
    }
  }, deps)
}
