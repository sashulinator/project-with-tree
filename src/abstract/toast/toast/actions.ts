import mitt from 'mitt'

import { Id } from '~/utils/core'
import { BaseError } from '~/utils/error'

import { get as getContainer } from '../container/actions'
import { ContainerEventNames } from '../container/event-names'
import { Container } from '../container/types'
import { store } from '../store'
import { ToastEventNames } from './event-names'
import { Toast } from './types'

export function find(id: Id): Toast | undefined {
  return store.toasts[id]
}

export function get(id: Id): Toast {
  const toast = store.toasts[id]

  if (toast === undefined) {
    throw new BaseError('Cannot get Toast', { id })
  }

  return toast
}

export function add(toast?: Partial<Toast>): void {
  const container = getContainer(toast?.containerId)
  const generatedToast = generate(toast, container)
  subscribe(generatedToast)
  store.toasts[generatedToast.id] = generatedToast
  container.emitter.emit(ContainerEventNames.addToast, generatedToast)
  generatedToast.emitter.emit(ToastEventNames.setEntering)
}

function setEntering(id: Id): void {
  const toast = get(id)
  toast.isEntering = true
  toast.isExiting = false
  toast.isShowing = false
  toast.emitter.emit(ToastEventNames.transitEntering)
}

function setShowing(id: Id): void {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  toast.isEntering = false
  toast.isExiting = false
  toast.isShowing = true
  toast.emitter.emit(ToastEventNames.transitShowing)
}

function setExiting(id: Id): void {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  toast.isEntering = false
  toast.isExiting = true
  toast.isShowing = false
  toast.emitter.emit(ToastEventNames.transitExiting)
}

function transitEntering(id: Id): void {
  transite(id, 'Entering', (toast) => toast.emitter.emit(ToastEventNames.setShowing))
}
function transitShowing(id: Id): void {
  transite(id, 'Showing', (toast) => toast.emitter.emit(ToastEventNames.setExiting))
}
function transitExiting(id: Id): void {
  transite(id, 'Exiting', (toast) => toast.emitter.emit(ToastEventNames.remove))
}

function stopShowingTransition(id: Id): void {
  stopTransition(id, 'Showing')
}
function stopEnteringTransition(id: Id): void {
  stopTransition(id, 'Entering')
}
function stopExitingTransition(id: Id): void {
  stopTransition(id, 'Exiting')
}
function continueShowingTransition(id: Id): void {
  continueTransition(id, 'Showing')
}
function continueEnteringTransition(id: Id): void {
  continueTransition(id, 'Entering')
}
function continueExitingTransition(id: Id): void {
  continueTransition(id, 'Exiting')
}

function remove(id: Id): void {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  const container = getContainer(toast.containerId)
  container.emitter.emit(ContainerEventNames.removeToast, toast)
  delete store.toasts[id]
  toast.emitter.emit(ToastEventNames.removed)
}
// Private

function generate(toast: Partial<Toast> | undefined, container: Container): Toast<unknown> {
  store.toastSequenceId += 1

  return {
    ...container.defaultToast,
    id: store.toastSequenceId,
    containerId: container.id,
    emitter: mitt(),
    ...toast,
  }
}

function subscribe(toast: Toast<unknown>): void {
  toast.emitter.on(ToastEventNames.setEntering, () => setEntering(toast.id))
  toast.emitter.on(ToastEventNames.setShowing, () => setShowing(toast.id))
  toast.emitter.on(ToastEventNames.setExiting, () => setExiting(toast.id))
  toast.emitter.on(ToastEventNames.transitShowing, () => transitShowing(toast.id))
  toast.emitter.on(ToastEventNames.transitEntering, () => transitEntering(toast.id))
  toast.emitter.on(ToastEventNames.transitExiting, () => transitExiting(toast.id))
  toast.emitter.on(ToastEventNames.continueEnteringTransition, () => continueEnteringTransition(toast.id))
  toast.emitter.on(ToastEventNames.continueExitingTransition, () => continueExitingTransition(toast.id))
  toast.emitter.on(ToastEventNames.continueShowingTransition, () => continueShowingTransition(toast.id))
  toast.emitter.on(ToastEventNames.stopEnteringTransition, () => stopEnteringTransition(toast.id))
  toast.emitter.on(ToastEventNames.stopExitingTransition, () => stopExitingTransition(toast.id))
  toast.emitter.on(ToastEventNames.stopShowingTransition, () => stopShowingTransition(toast.id))
  toast.emitter.on(ToastEventNames.remove, () => remove(toast.id))
}

function transite(id: Id, type: 'Entering' | 'Exiting' | 'Showing', onExit: (toast: Toast) => void): void {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }

  if (toast[`is${type}TransitionStopped`]) {
    setTimeout(() => toast.emitter.emit(`transit${type}`), 100)
    return
  }

  const lowercasedType = type.toLowerCase()
  toast[`${lowercasedType}Transition`] += 100
  const isTimeToExit = toast[`${lowercasedType}Transition`] >= toast[`max${type}Transition`]

  if (isTimeToExit) {
    onExit(toast)
  } else {
    setTimeout(() => toast.emitter.emit(`transit${type}`), 100)
  }
}

function stopTransition(id: Id, type: 'Showing' | 'Entering' | 'Exiting'): void {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  toast[`is${type}TransitionStopped`] = true
}

function continueTransition(id: Id, type: 'Showing' | 'Entering' | 'Exiting'): void {
  const toast = store.toasts[id]
  if (toast === undefined) {
    return
  }
  toast[`is${type}TransitionStopped`] = false
}
