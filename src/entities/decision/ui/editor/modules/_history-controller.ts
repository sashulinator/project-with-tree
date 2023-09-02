import { ActionHistory, Step, StepController } from '~/utils/action-history'
import { Id, Position } from '~/utils/core'
import { Required } from '~/utils/types/object'

import { CanvasController } from '..'
import { Point, RuleSet } from '../../..'
import { _addNode } from '../_private'
import { _calcColumnNodesPositions } from '../lib/_calc-column-nodes-positions'
import { LinkController, LinkListController, NodeController, NodeListController, getColumnX } from '../widgets/canvas'

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

export type MoveNodeItem = {
  type: 'moveNodes'
  historical: true
  redo: Record<Id, Position>
  undo: Record<Id, Position>
}

export type RemoveLinkItem = {
  type: 'removeLink'
  historical: true
  redo: { linkId: Id }
  undo: { ruleSet: RuleSet; linkId: Id; sourceId: Id | undefined }
}

type StepItem = SelectNodesItem | AddNodeItem | RemoveNodeItem | RemoveLinkItem | SelectLinksItem | MoveNodeItem

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
        item.done ? this.nodeList.remove(event.undo.id) : _addNode(this, event.redo.point, { duration: 0 })
      }
      if (event.type === 'removeNodes') {
        item.done ? _addNode(this, event.undo.point, { duration: 0 }) : this.nodeList.remove(event.redo.id)
      }
      if (event.type === 'moveNodes') {
        Object.entries(item.done ? event.undo : event.redo).forEach(([key, value]) => {
          const node = this.nodeList.find(key)
          if (!node) return
          node.position.transitionMove(value)
        }, {})
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
  private itemifyCreateNode = (
    point: Required<Partial<Point>, 'level'>
    // event?: (TransitionMoveEvent & Record<string, unknown>) | undefined
  ): void => {
    const newPoint = _addNode(this, point)
    this.step.add('addNode', { point: newPoint }, { id: newPoint.id }, true).build()
  }

  create = (
    point: Required<Partial<Point>, 'level'>
    // event?: (TransitionMoveEvent & Record<string, unknown>) | undefined
  ): void => {
    this.itemifyCreateNode(point)
    this.addStep(this.step.build() as Step<StepItem>)
    this.factory(this.steps[0])
  }

  /**
   * TRANSITION MOVE NODES
   */
  private itemifyMoveNodes = (ids: Id[]): void => {
    const nodes = ids.map((id) => this.nodeList.find(id)).filter(Boolean) as NodeController[]
    // Получаем словарь где key это x ноды, а value сама нода
    const newXNodes = this.nodeList.getColumnNodes(true)
    const oldXNodes = this.nodeList.getColumnNodes(false)

    // Получаем уникальные Иксы каждой колонки где были и будут перетаскиваемые ноды
    const xs = nodes.reduce((acc, node) => {
      acc.add(node.position.start.x)
      acc.add(getColumnX(node.position.value.x))
      return acc
    }, new Set<number>())

    // Получаем новые координаты каждой ноды колонок
    const newNodesPositions = [...xs].reduce<Record<Id, Position>>((acc, x) => {
      const nodes = newXNodes[x]
      if (!nodes) return acc
      return {
        ...acc,
        ..._calcColumnNodesPositions(this, nodes?.map((node) => node.id), x),
      }
    }, {})

    // Получаем старык координаты каждой ноды колонок
    const oldNodesPositions = [...xs].reduce<Record<Id, Position>>((acc, x) => {
      const nodes = oldXNodes[x]
      if (!nodes) return acc
      return {
        ...acc,
        ...nodes.reduce<Record<Id, Position>>((acc, node) => {
          acc[node.id] = node.position.start
          return acc
        }, {}),
      }
    }, {})

    this.step.add('moveNodes', newNodesPositions, oldNodesPositions, true)
  }

  move = (nodeIds: Id[]): void => {
    console.log('move')

    this.itemifyMoveNodes(nodeIds)
    this.addStep(this.step.build() as Step<StepItem>)
    this.factory(this.steps[0])
  }

  /**
   * REMOVE
   */
  private itemifyRemoveNodes = (ids: Id[]): void => {
    ids.forEach((id) => {
      const point = this.nodeList.get(id).deserialize()
      this.step.add('removeNodes', { id: point.id }, { point }, true)
    })

    const filteredSelectedIds = this.nodeList.selection.value.filter((sId) => !ids.includes(sId))
    this.itemifySelectNodes(filteredSelectedIds)
  }

  private itemifyRemoveLinks = (ids: Id[]): void => {
    ids.forEach((id) => {
      const link = this.linkList.get(id)
      this.step.add(
        'removeLink',
        { linkId: id },
        { ruleSet: link.deserialize(), linkId: id, sourceId: link.sourceId.value },
        true
      )
    })

    const filteredSelectedIds = this.linkList.selection.value.filter((sId) => !ids.includes(sId))
    this.itemifySelectLinks(filteredSelectedIds)
  }

  remove = (nodeIds: Id[], linkIds: Id[]): void => {
    this.itemifyRemoveNodes(nodeIds)
    const allAffectedNodesIds = new Set(nodeIds)
    const allAffectedlinksIds = new Set(linkIds)

    nodeIds.forEach((nodeId) => {
      this.linkList.values().forEach((link) => {
        if (link.sourceId.value !== nodeId && link.targetId.value !== nodeId) return
        if (link.sourceId.value) allAffectedNodesIds.add(link.sourceId.value)
        if (link.targetId.value) allAffectedNodesIds.add(link.targetId.value)
        allAffectedlinksIds.add(link.id)
      })
    })

    this.itemifyRemoveLinks([...allAffectedlinksIds])
    this.itemifyMoveNodes([...allAffectedNodesIds].filter((id) => !nodeIds.includes(id)))
    this.addStep(this.step.build() as Step<StepItem>)
    this.factory(this.steps[0])
  }

  /**
   * SELECTION
   */
  private itemifySelectNodes(ids: Id[]): void {
    this.step.add('selectNodes', { ids }, { ids: [...this.nodeList.selection.value] }, false)
  }

  private itemifySelectLinks(ids: Id[]): void {
    this.step.add('selectLinks', { ids }, { ids: [...this.linkList.selection.value] }, false)
  }

  select = (nodeIds: Id[], linkIds: Id[]): void => {
    this.itemifySelectNodes(nodeIds)
    this.itemifySelectLinks(linkIds)
    this.addStep(this.step.build() as Step<StepItem>)
    this.factory(this.steps[0])
  }
}
