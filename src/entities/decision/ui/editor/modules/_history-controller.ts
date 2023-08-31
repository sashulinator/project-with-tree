import { ActionHistory, HistoryItem } from '~/utils/action-history'
import { Id, Position } from '~/utils/core'

import { NodeListState } from '../widgets/canvas'

type Event<T> = {
  previous: T
  value: T
}

interface Props {
  nodeListState: NodeListState
}

export type SelectionEvent = { type: 'selection'; undo: { value: Id[] }; redo: { value: Id[] } }
export type NodePositionEvent = {
  type: 'node-position'
  undo: { value: Position }
  redo: { value: Position }
}

type Events = SelectionEvent | NodePositionEvent

export class HistoryController extends ActionHistory {
  nodeListState: NodeListState

  constructor(props: Props) {
    super()

    this.nodeListState = props.nodeListState
  }

  factory = (item: HistoryItem<Events>): void => {
    item.events.forEach((event) => {
      if (event.type === 'selection') {
        item.done ? this.undoSelection(event.undo.value) : this.redoSelection(event.redo.value)
        item.done = !item.done
      }
    })
  }

  undo = (): void => {
    const current = this.findCurrent()
    if (current) this.factory(current as HistoryItem<Events>)
  }

  redo = (): void => {
    const next = this.findNext()
    if (next) this.factory(next as HistoryItem<Events>)
  }

  /**
   * SELECTION
   */

  addSelection = (event: Event<Id[]>): void => {
    this.add({
      done: true,
      storeLocally: true,
      username: 'username',
      events: [
        {
          type: 'selection',
          redo: { value: event.value },
          undo: { value: event.previous },
        },
      ],
    })
  }

  undoSelection = (ids: Id[]): void => {
    this.nodeListState.selection.set(ids)
  }

  redoSelection = (ids: Id[]): void => {
    this.nodeListState.selection.set(ids)
  }
}
