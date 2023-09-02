import { ActionHistory, Step, StepController } from '~/utils/action-history'
import { Id } from '~/utils/core'
import { Required } from '~/utils/types/object'

import { CanvasController } from '..'
import { Point, RuleSet } from '../../..'
import { _addNode, _removeNode } from '../_private'
import { LinkController, LinkListController, NodeListController } from '../widgets/canvas'

interface Context {
  canvas: CanvasController
  nodeList: NodeListController
  linkList: LinkListController
}

export type SelectNodesItem = {
  type: 'selectNodes'
  historical: false
  undo: { ids: Id[] }
  redo: { ids: Id[] }
}

export type SelectLinksItem = {
  type: 'selectLinks'
  historical: false
  undo: { ids: Id[] }
  redo: { ids: Id[] }
}

export type AddNodeItem = {
  type: 'addNode'
  historical: true
  undo: { id: Id }
  redo: { point: Point }
}

export type RemoveNodeItem = {
  type: 'removeNodes'
  historical: true
  redo: { id: Id }
  undo: { point: Point }
}

export type RemoveLinkItem = {
  type: 'removeLink'
  historical: true
  redo: { linkId: Id }
  undo: { ruleSet: RuleSet; linkId: Id; sourceId: Id | undefined }
}

type StepItem = SelectNodesItem | AddNodeItem | RemoveNodeItem | RemoveLinkItem | SelectLinksItem

export class _HistoryController extends ActionHistory<Step<StepItem>> {
  nodeList: NodeListController

  canvas: CanvasController

  linkList: LinkListController

  step: StepController

  constructor(props: Context) {
    super()

    this.nodeList = props.nodeList

    this.linkList = props.linkList

    this.canvas = props.canvas

    this.step = new StepController()
  }

  factory = (item: Step<StepItem>): void => {
    item.list.forEach((event) => {
      if (event.type === 'selectNodes') {
        this.nodeList.selection.set(item.done ? event.undo.ids : event.redo.ids)
      }
      if (event.type === 'selectLinks') {
        this.linkList.selection.set(item.done ? event.undo.ids : event.redo.ids)
      }
      if (event.type === 'addNode') {
        item.done ? _removeNode(this, event.undo.id) : _addNode(this, event.redo.point, { duration: 0 })
      }
      if (event.type === 'removeNodes') {
        item.done ? _addNode(this, event.undo.point, { duration: 0 }) : _removeNode(this, event.redo.id)
      }
      if (event.type === 'removeLink') {
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
    this.factory(current)
  }

  redo = (): void => {
    const next = this.findNext()
    if (next) this.factory(next)
  }

  /**
   * ADD NODE
   */

  addNode = (
    point: Required<Partial<Point>, 'level'>
    // event?: (TransitionMoveEvent & Record<string, unknown>) | undefined
  ): void => {
    const newPoint = _addNode(this, point)
    const step = this.step.add('addNode', { point: newPoint }, { id: newPoint.id }, true).build()
    this.add(step as Step<StepItem>)
  }

  /**
   * REMOVE NODE
   */

  removeNodes = (ids: Id[]): void => {
    ids.forEach((id) => {
      const point = this.nodeList.get(id).deserialize()

      this.step.add('removeNodes', { id: point.id }, { point }, true)

      this.linkList.values().forEach((iLink) => {
        if (iLink.sourceId.value === id) {
          this.step.add(
            'removeLink',
            { linkId: iLink.id },
            { ruleSet: iLink.deserialize(), linkId: iLink.id, sourceId: id },
            true
          )
          this.linkList.remove(iLink.id)
        } else if (iLink.targetId.value === id) {
          this.step.add(
            'removeLink',
            { linkId: iLink.id },
            { ruleSet: iLink.deserialize(), linkId: iLink.id, sourceId: iLink.sourceId.value },
            true
          )
          this.linkList.remove(iLink.id)
        }
      })

      _removeNode(this, point.id)
      this.add(this.step.build() as Step<StepItem>)
    })

    const newSelectedIds = this.nodeList.selection.value.filter((sId) => !ids.includes(sId))
    this.step.add('selectNodes', { ids: newSelectedIds }, { ids: [...this.nodeList.selection.value] }, false)
    this.nodeList.selection.set(newSelectedIds)
  }

  /**
   * SELECTION
   */

  select = (nodeIds: Id[], linkIds: Id[]): void => {
    this.step.add('selectNodes', { ids: nodeIds }, { ids: [...this.nodeList.selection.value] }, false)
    this.step.add('selectLinks', { ids: linkIds }, { ids: [...this.linkList.selection.value] }, false)
    this.add(this.step.build() as Step<StepItem>)
    this.nodeList.selection.set(nodeIds)
    this.linkList.selection.set(linkIds)
  }
}
