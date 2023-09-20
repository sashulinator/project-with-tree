import { Selection } from '~/lib/emitter'
import { Id, assertDefined, invariant } from '~/utils/core'
import { EmitterDictionary, Prop } from '~/utils/emitter'

import { Point } from '../../../../../../../../../types/point'
import { Rule } from '../../../../../../../../../types/rule'
import { Controller as LinkController, Props as LinkControllerProps } from '../../../models/constroller'

type Events = {
  // Наследуемые события
  add: { item: LinkController }
  update: { item: LinkController }
  remove: { item: LinkController }
  // Уникальные события
  jointEditingId: { value: Id }
  rulesEditingId: { value: Id }
  selection: { value: Id[] }
  // События стейтов
  index: { value: number; item: LinkController }
  targetId: { value: Id; item: LinkController }
  sourceId: { value: Id; item: LinkController }
  rules: { value: Rule[]; item: LinkController }
}

export class Controller extends EmitterDictionary<LinkController, Events> {
  /**
   * Id Линки которая находится в режиме редактирования Joint т.е. sourceId или targetId
   */
  jointEditingId: Prop<'jointEditingId', Id | undefined>

  /**
   * Id Линки которая находится в режиме редактирования Rules
   */
  rulesEditingId: Prop<'rulesEditingId', Id | undefined>

  /**
   * Ids выделенных Линков
   */
  selection: Selection<'selection'>

  constructor(pointList: Point[]) {
    const linkList = pointList
      .flatMap((point) => point.children?.map((pointLink) => LinkController.fromLink(pointLink, point.id)))
      .filter((t) => !!t) as LinkController[]

    super(linkList, (l) => l.id.toString())

    this.selection = new Selection('selection', [] as Id[], this)

    this.jointEditingId = new Prop('jointEditingId', undefined as Id | undefined, this)

    this.rulesEditingId = new Prop('rulesEditingId', undefined as Id | undefined, this)
  }

  getJointEditingLink = (): LinkController => {
    return this.get(this.jointEditingId.value)
  }

  getRulesEditingLink = (): LinkController => {
    return this.get(this.rulesEditingId.value)
  }

  findJointEditingLink = (): LinkController | undefined => {
    return this.find(this.jointEditingId.value)
  }

  getBySourceId = (id: Id): LinkController[] => {
    return this.values().filter((state) => state.sourceId.value === id)
  }

  getByTargetId = (id: Id): LinkController[] => {
    return this.values().filter((state) => state.targetId.value === id)
  }

  startNew(props: LinkControllerProps): void {
    const editingLinkState = this.findJointEditingLink()
    invariant(!editingLinkState, 'You cannot start new Link while editing')
    const newLink = new LinkController(props)
    this.add(newLink)
    if (!props.sourceId && !props.targetId) throw new Error('`sourceId` or `targetId` must be passed')
    this.jointEditingId.value = newLink.id
  }

  finishNew(nodeId: Id): void {
    const editingLink = this.findJointEditingLink()
    assertDefined(editingLink)
    assertDefined(editingLink?.sourceId.value || editingLink?.targetId.value)
    const isTargetExists = !!editingLink?.targetId.value
    // Если target уже существует, значит поместим nodeId в sourceId
    editingLink?.[isTargetExists ? 'sourceId' : 'targetId'].set(nodeId)

    const sourceId = editingLink?.sourceId.value
    assertDefined(sourceId, 'SourceId does not exists')

    const sourceLinks = this.getBySourceId(sourceId)
    editingLink?.index.set(sourceLinks.length - 1)

    this.jointEditingId.value = undefined
  }

  startJointEditing(linkId: Id, nodeId: Id): void {
    const editingLinkState = this.findJointEditingLink()

    invariant(!editingLinkState, 'You are already in the middle of editing')

    const link = this.get(linkId)

    if (link.targetId.value !== nodeId && link.sourceId.value !== nodeId) {
      throw new Error('nodeId is neither targetId nor sourceId')
    }

    const isSourceEditing = link.sourceId.value === nodeId

    if (isSourceEditing) {
      const newState = new LinkController({ index: 0, targetId: link.targetId.value })
      this.add(newState)
      this.jointEditingId.value = newState.id
    } else {
      this.jointEditingId.value = linkId
    }

    link.targetId.value = undefined
  }

  finishJointEditing(linkId: Id): void {
    const editingLink = this.findJointEditingLink()

    assertDefined(editingLink)

    this.jointEditingId.value = undefined

    if (editingLink.targetId.value === undefined && editingLink.sourceId.value === undefined) {
      throw new Error('state has no targetId and no sourceId')
    }

    const linkController = this.get(linkId)
    linkController.targetId.value = editingLink.targetId.value
    this.remove(editingLink.id)
  }

  swapSourceIndexes(nodeId: Id, dragIndex: number, hoverIndex: number): void {
    const linkControllers = this.getBySourceId(nodeId)
    const dragState = linkControllers.find((s) => s.index.value === dragIndex)
    const hoverState = linkControllers.find((s) => s.index.value === hoverIndex)
    assertDefined(dragState)
    assertDefined(hoverState)
    hoverState.index.value = dragIndex
    dragState.index.value = hoverIndex
  }
}
