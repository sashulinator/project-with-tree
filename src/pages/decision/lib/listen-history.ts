import { CanvasState, EventNames, Events } from '~/entities/decision'
import { ActionHistory } from '~/utils/action-history'
import { Any } from '~/utils/core'

export function listenHistory<E extends EventNames>(
  history: ActionHistory,
  state: CanvasState,
  eventName: E,
  event: Events[E] & { isHistory?: true }
): void {
  if (event.isHistory) return

  if (eventName === 'setSelected') {
    const prev = state.selected.previousValue
    const redo = (): void => {
      state.emitter.emit(eventName, { ...event, isHistory: true })
    }
    const undo = (): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      state.emitter.emit(eventName, { value: prev, isHistory: true } as Any)
    }
    history.add(redo, undo)
  }

  // if (eventName === 'setPosition' && (event as Events['setPosition'])) {
  //   const prev = state._selected.previousValue
  //   const redo = (): void => {
  //     state.emitter.emit(eventName, { ...event, isHistory: true })
  //   }
  //   const undo = (): void => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     state.emitter.emit(eventName, { value: prev, isHistory: true } as Any)
  //   }
  //   history.add(redo, undo)
  // }
}
