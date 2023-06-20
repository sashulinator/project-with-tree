import './container.scss'

import { useEffect, useMemo } from 'react'

import { add, get } from '~/abstract/toast/container/actions'
import { ContainerEventNames } from '~/abstract/toast/container/event-names'
import { ToastEventNames } from '~/abstract/toast/toast/event-names'
import { useForceUpdate, useOnMount } from '~/utils/hooks'
import { useMediaQuery } from '~/utils/hooks/media-query'
import { useOnUnmount } from '~/utils/hooks/on-unmount'

import Toast from './toast'

export default function ToastContainer(): JSX.Element {
  const isPortrait = useMediaQuery('(orientation: portrait)')
  const id = useMemo(() => add({ id: 1 }).id, [])
  const container = get(id)
  const toastIds = [...container.toastIds].reverse()
  const update = useForceUpdate()

  useOnMount(() => {
    container.emitter.on(ContainerEventNames.addedToast, update)
    container.emitter.on(ContainerEventNames.removedToast, update)
  })
  useOnUnmount(() => container.emitter.emit(ToastEventNames.unmount))

  useEffect(() => container.emitter.emit(ContainerEventNames.change, { id, max: isPortrait ? 1 : 3 }), [isPortrait])

  return (
    <aside
      data-x='ToastContainer'
      style={{
        position: 'fixed',
        zIndex: 500,
        bottom: isPortrait ? undefined : 0,
        top: isPortrait ? 0 : undefined,
        width: '100%',
      }}
    >
      {toastIds.map((id) => (
        <Toast key={id} id={id} isPortrait={isPortrait} />
      ))}
    </aside>
  )
}
