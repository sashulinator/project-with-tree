import { ActionHistory, HistoryItem } from '~/utils/action-history'
import { Id } from '~/utils/core'
import { Required } from '~/utils/types/object'

import { CanvasController } from '..'
import { Point, RuleSet } from '../../..'
import { addNode, removeNode } from '../_private'
import { LinkController, LinkListController, NodeListController } from '../widgets/canvas'

type Event<T> = {
  previous: T
  value: T
}

interface Props {
  canvas: CanvasController
  nodeList: NodeListController
  linkList: LinkListController
}

export type SelectionEvent = {
  type: 'selection'
  historical: false
  undo: { value: Id[] }
  redo: { value: Id[] }
}

export type AddNodeEvent = {
  type: 'addNode'
  historical: true
  undo: { id: Id }
  redo: { point: Point }
}
export type RemoveNodeEvent = {
  type: 'removeNode'
  historical: true
  redo: { id: Id }
  undo: { point: Point }
}
export type RemoveLinkEvent = {
  type: 'removeLink'
  historical: true
  redo: { linkId: Id }
  undo: { ruleSet: RuleSet; linkId: Id; sourceId: Id | undefined }
}

type Events = SelectionEvent | AddNodeEvent | RemoveNodeEvent | RemoveLinkEvent

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
      }
      if (event.type === 'addNode') {
        item.done ? removeNode(this, event.undo.id) : addNode(this, event.redo.point, { duration: 0 })
      }
      if (event.type === 'removeNode') {
        item.done ? addNode(this, event.undo.point, { duration: 0 }) : removeNode(this, event.redo.id)
      }
      if (event.type === 'removeLink') {
        console.log('item', item)
        if (item.done) {
          this.linkList.add(
            new LinkController({
              id: event.undo.linkId,
              sourceId: event.undo.sourceId,
              targetId: event.undo.ruleSet.id,
              rules: event.undo.ruleSet.rules,
              index: event.undo.ruleSet.index,
            })
          )
        } else {
          this.linkList.remove(event.redo.linkId)
        }
      }
    })

    item.done = !item.done
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

    const historyItem: HistoryItem<AddNodeEvent> = {
      done: true,
      username: 'username',
      events: [
        {
          historical: true,
          type: 'addNode',
          redo: { point: newPoint },
          undo: { id: newPoint.id },
        },
      ],
    }
    this.add(historyItem)
  }

  /**
   * REMOVE NODE
   */

  removeNodes = (ids: Id[]): void => {
    const historyItem: HistoryItem<RemoveNodeEvent | RemoveLinkEvent | SelectionEvent> = {
      done: true,
      username: 'username',
      events: [],
    }

    ids.forEach((id) => {
      const point = this.nodeList.get(id).deserialize()

      historyItem.events.push({
        type: 'removeNode',
        historical: true,
        redo: { id: point.id },
        undo: { point },
      })

      this.linkList.values().forEach((iLink) => {
        if (iLink.sourceId.value === id) {
          historyItem.events.push({
            historical: true,
            type: 'removeLink',
            redo: { linkId: iLink.id },
            undo: { ruleSet: iLink.deserialize(), linkId: iLink.id, sourceId: id },
          })
          this.linkList.remove(iLink.id)
        } else if (iLink.targetId.value === id) {
          historyItem.events.push({
            historical: true,
            type: 'removeLink',
            redo: { linkId: iLink.id },
            undo: { ruleSet: iLink.deserialize(), linkId: iLink.id, sourceId: iLink.sourceId.value },
          })
          this.linkList.remove(iLink.id)
        }
      })

      removeNode(this, point.id)
      this.add(historyItem)
    })

    const newSelectedIds = this.nodeList.selection.value.filter((sId) => !ids.includes(sId))
    historyItem.events.push({
      type: 'selection',
      historical: false,
      redo: { value: newSelectedIds },
      undo: { value: [...this.nodeList.selection.value] },
    })
    this.nodeList.selection.set(newSelectedIds)
  }

  /**
   * SELECTION
   */

  addNodeSelection = (event: Event<Id[]>): void => {
    this.add({
      done: true,
      username: 'username',
      events: [
        {
          historical: false,
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
