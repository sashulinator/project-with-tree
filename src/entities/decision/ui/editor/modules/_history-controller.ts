import { ActionHistory, HistoryItem } from '~/utils/action-history'
import { Id } from '~/utils/core'
import { Required } from '~/utils/types/object'

import { CanvasController } from '..'
import { Point, RuleSet } from '../../..'
import { addNode, removeNode } from '../_private'
import { LinkController, LinkListController, NodeListController } from '../widgets/canvas'

interface Props {
  canvas: CanvasController
  nodeList: NodeListController
  linkList: LinkListController
}

export type SelectionEvent = {
  type: 'selection'
  historical: false
  undo: { ids: Id[] }
  redo: { ids: Id[] }
}

export type AddNodeEvent = {
  type: 'addNode'
  historical: true
  undo: { id: Id }
  redo: { point: Point }
}
export type RemoveNodeEvent = {
  type: 'removeNodes'
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
        this.nodeList.selection.set(item.done ? event.undo.ids : event.redo.ids)
      }
      if (event.type === 'addNode') {
        item.done ? removeNode(this, event.undo.id) : addNode(this, event.redo.point, { duration: 0 })
      }
      if (event.type === 'removeNodes') {
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
    if (!current) return
    this.factory(current as HistoryItem<Events>)
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
        type: 'removeNodes',
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
      redo: { ids: newSelectedIds },
      undo: { ids: [...this.nodeList.selection.value] },
    })
    this.nodeList.selection.set(newSelectedIds)
  }

  /**
   * SELECTION
   */

  selectNodes = (ids: Id[]): void => {
    const historyItem: HistoryItem<SelectionEvent> = {
      done: true,
      username: 'username',
      events: [
        {
          historical: false,
          type: 'selection',
          redo: { ids },
          undo: { ids: [...this.nodeList.selection.value] },
        },
      ],
    }

    this.add(historyItem)
    this.nodeList.selection.set(ids)
  }
}
