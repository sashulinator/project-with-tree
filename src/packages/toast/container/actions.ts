import mitt from 'mitt'

import { Id } from '~/utils/core'
import { BaseError } from '~/utils/error'

import { getContainer } from '..'
import { store } from '../store'
import { get as getToast } from '../toast/actions'
import { ToastEventNames } from '../toast/event-names'
import { Toast } from '../toast/types'
import { ContainerEventNames } from './event-names'
import { Container } from './types'

export function find(id?: Id): Container | undefined {
  return store.containers[id ?? store.containerSequenceId]
}

export function get(id?: Id): Container {
  if (Object.keys(store.containers).length > 1 && id === undefined) {
    throw new Error('You have more than one Toaster so you must provide "toasterId"')
  }
  const container = find(id)
  if (container === undefined) {
    throw new BaseError('Cannot get Container', { id })
  }
  return container
}

export function add(container?: Partial<Container>): Container {
  const existedContainer = store.containers[container?.id || '']

  if (existedContainer) {
    return existedContainer
  }

  const generatedContainer = generate(container)
  store.containers[generatedContainer.id] = generatedContainer
  subscribe(generatedContainer)

  return generatedContainer
}

function change(container?: Partial<Container>): Container {
  const currentContainer = getContainer(container?.id)
  const newContainer = { ...currentContainer, ...container }
  store.containers[newContainer.id] = newContainer
  return newContainer
}

function remove(id: Id): void {
  store[id].emitter.all.clear()
  delete store[id]
}

function addToast(toast: Toast) {
  const container = find(toast.containerId)
  if (container === undefined) {
    return
  }
  container.toastIds.push(toast.id)
  if (container.max <= container.toastIds.length) {
    const excessiveToastIds = container.toastIds.slice(0, container.toastIds.length - container.max)
    excessiveToastIds.forEach((id) => getToast(id).emitter.emit(ToastEventNames.setExiting))
  }
  container.emitter.emit(ContainerEventNames.addedToast, toast.id)
}

function removeToast(toast: Toast) {
  const container = find(toast.containerId)
  if (container === undefined) {
    return
  }

  container.toastIds = container.toastIds.filter((id) => id !== toast.id)
  container.emitter.emit(ContainerEventNames.removedToast, toast.id)
}

// Private

function generate(contaner?: Partial<Container>): Container {
  store.containerSequenceId += 1
  const generatedContainer = {
    id: store.containerSequenceId,
    emitter: mitt(),
    entering: [],
    showing: [],
    exiting: [],
    toastIds: [],
    max: 3,
    defaultToast: {
      containerId: store.containerSequenceId,
      data: undefined,
      isEntering: false,
      isShowing: false,
      isExiting: false,
      showingMs: 0,
      showingTransition: 0,
      enteringTransition: 0,
      exitingTransition: 0,
      isShowingTransitionStopped: false,
      isEnteringTransitionStopped: false,
      isExitingTransitionStopped: false,
      maxEnteringTransition: 300,
      maxExitingTransition: 700,
      maxShowingTransition: 5000,
      exitTransitionMs: 0,
      type: 'default',
      ...contaner?.defaultToast,
    },
    ...contaner,
  }
  return generatedContainer
}

function subscribe(container: Container) {
  container.emitter.on(ContainerEventNames.unmount, remove)
  container.emitter.on(ContainerEventNames.addToast, addToast)
  container.emitter.on(ContainerEventNames.removeToast, removeToast)
  container.emitter.on(ContainerEventNames.change, change)
}
