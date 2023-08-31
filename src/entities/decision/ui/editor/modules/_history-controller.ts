import { ActionHistory, HistoryItem } from '~/utils/action-history'
import { Id } from '~/utils/core'
import { Required } from '~/utils/types/object'

import { CanvasController } from '..'
import { Point } from '../../..'
import { addNode, removeNode } from '../_private'
import { LinkListController, NodeListController } from '../widgets/canvas'

type Event<T> = {
  previous: T
  value: T
}

interface Props {
  canvas: CanvasController
  nodeList: NodeListController
  linkList: LinkListController
}

export type SelectionEvent = { type: 'selection'; undo: { value: Id[] }; redo: { value: Id[] } }

export type NodePositionEvent = {
  type: 'node-add'
  undo: { id: Id }
  redo: { point: Point }
}

type Events = SelectionEvent | NodePositionEvent

export class HistoryController extends ActionHistory {
  nodeList: NodeListController

  canvas: CanvasController

  linkList: LinkListController

  constructor(props: Props) {
    super()

    this.nodeList = props.nodeList

    this.linkList = props.linkList

    this.canvas = props.canvas
  }

  factory = (item: HistoryItem<Events>): void => {
    item.events.forEach((event) => {
      if (event.type === 'selection') {
        this.selectNodes(item.done ? event.undo.value : event.redo.value)
        item.done = !item.done
      }
      if (event.type === 'node-add') {
        item.done ? removeNode(this)(event.undo.id) : addNode(this, event.redo.point, { duration: 0 })
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
   * ADD NODE
   */

  addNode = (
    point: Required<Partial<Point>, 'level'>
    // event?: (TransitionMoveEvent & Record<string, unknown>) | undefined
  ): void => {
    const newPoint = addNode(this, point)

    const historyItem: HistoryItem<NodePositionEvent> = {
      done: true,
      storeLocally: false,
      username: 'username',
      events: [
        {
          type: 'node-add',
          redo: { point: newPoint },
          undo: { id: newPoint.id },
        },
      ],
    }
    this.add(historyItem)
  }

  /**
   * SELECTION
   */

  addNodeSelection = (event: Event<Id[]>): void => {
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

  selectNodes = (ids: Id[]): void => {
    this.nodeList.selection.set(ids)
  }
}
