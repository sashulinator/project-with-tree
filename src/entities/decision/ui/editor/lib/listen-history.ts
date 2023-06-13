import { EditorState, Events } from '~/entities/decision'
import { ActionHistory } from '~/utils/action-history'
import { Any } from '~/utils/core'

// import { AnyEvent } from '~/utils/emitter'

export function listenHistory(history: ActionHistory, state: EditorState, eventName: string, event: Any): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (event.isHistory) return

  // if (eventName === 'selected') {
  //   const prev = state.selected.previousValue
  //   const redo = (): void => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     state.emit(eventName as any, { ...event, isHistory: true })
  //   }
  //   const undo = (): void => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     state.emit(eventName as any, { value: prev, isHistory: true } as Any)
  //   }
  //   history.add(redo, undo)
  // }

  // if (eventName === 'setPosition') {
  //   const e = event as Events['setPosition']

  //   if (!e.isLast) return

  //   const pointState = state.itemStates.get(e.itemId)
  //   const previousValue = pointState.position.previous

  //   const redo = (): void => {
  //     const redoEvent: Events['setPosition'] & { isHistory: true } = { ...e, isHistory: true }
  //     state.itemStates.emit(e.itemId, eventName, redoEvent)
  //   }

  //   const undo = (): void => {
  //     const undoEvent: Events['setPosition'] & { isHistory: true } = {
  //       itemId: e.itemId,
  //       value: previousValue,
  //       isLast: true,
  //       isHistory: true,
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     state.itemStates.emit(e.itemId, eventName, undoEvent as Any)
  //   }

  //   history.add(redo, undo)
  // }
}
