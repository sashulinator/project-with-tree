import { Point, Rule } from '~/entities/point'
import { Id, assertDefined, invariant } from '~/utils/core'
import { Dictionary, Prop } from '~/utils/emitter'

import { ControllerProps, Controller as LinkController } from '../../..'

type Events = {
  // Наследуемые события
  add: { item: LinkController }
  update: { item: LinkController }
  remove: { item: LinkController }
  // Уникальные события
  editingId: { value: Id }
  editingRuleSet: { value: Id }
  // События стейтов
  index: { value: number; item: LinkController }
  targetId: { value: Id; item: LinkController }
  sourceId: { value: Id; item: LinkController }
  rules: { value: Rule; item: LinkController }
}

export class Controller extends Dictionary<LinkController, Events> {
  editingId: Prop<'editingId', Id | undefined>

  editingRuleSet: Prop<'editingRuleSet', Id | undefined>

  constructor(pointList: Point[]) {
    const linkStates = pointList
      .flatMap((point) => {
        return point.children?.map(
          (ruleSet) =>
            new LinkController({ sourceId: point.id, targetId: ruleSet.id, rules: ruleSet.rules, index: ruleSet.index })
        )
      })
      .filter((t) => !!t) as LinkController[]

    super(linkStates, (l) => l.id.toString())

    this.editingId = new Prop<'editingId', Id | undefined>('editingId', undefined, this)

    this.editingRuleSet = new Prop('editingRuleSet', undefined as Id | undefined, this)
  }

  getEditingLinkState = (): LinkController => {
    return this.get(this.editingId.value)
  }

  getEditingRuleState = (): LinkController => {
    return this.get(this.editingRuleSet.value)
  }

  findEditingLinkState = (): LinkController | undefined => {
    return this.find(this.editingId.value)
  }

  getLinksBySourceId = (id: Id): LinkController[] => {
    return this.values().filter((state) => state.sourceId.value === id)
  }

  getLinksByTargetId = (id: Id): LinkController[] => {
    return this.values().filter((state) => state.targetId.value === id)
  }

  startNewLink(props: ControllerProps): void {
    const editingLinkState = this.findEditingLinkState()
    invariant(!editingLinkState, 'You cannot start new Link while editing')
    const newLink = new LinkController(props)
    this.add(newLink)
    if (!props.sourceId && !props.targetId) throw new Error('`sourceId` or `targetId` must be passed')
    this.editingId.value = newLink.id
  }

  finishNewLink(nodeId: Id): void {
    const editingLinkState = this.findEditingLinkState()
    assertDefined(editingLinkState)
    assertDefined(editingLinkState?.sourceId.value || editingLinkState?.targetId.value)
    const isTargetExists = !!editingLinkState?.targetId.value
    // Если target уже существует, значит поместим nodeId в sourceId
    editingLinkState?.[isTargetExists ? 'sourceId' : 'targetId'].set(nodeId)

    const sourceId = editingLinkState?.sourceId.value
    assertDefined(sourceId, 'SourceId does not exists')

    const sourceLinksStates = this.getLinksBySourceId(sourceId)
    editingLinkState?.index.set(sourceLinksStates.length - 1)

    this.editingId.value = undefined
  }

  startEditing(linkId: Id, nodeId: Id): void {
    const editingLinkState = this.findEditingLinkState()

    invariant(!editingLinkState, 'You are already in the middle of editing')

    const linkState = this.get(linkId)

    if (linkState.targetId.value !== nodeId && linkState.sourceId.value !== nodeId) {
      throw new Error('nodeId is neither targetId nor sourceId')
    }

    const isSourceEditing = linkState.sourceId.value === nodeId

    if (isSourceEditing) {
      const newState = new LinkController({ index: 0, targetId: linkState.targetId.value })
      this.add(newState)
      this.editingId.value = newState.id
    } else {
      this.editingId.value = linkId
    }

    linkState.targetId.value = undefined
  }

  finishEditing(linkId: Id): void {
    const editingLinkState = this.findEditingLinkState()

    assertDefined(editingLinkState)

    this.editingId.value = undefined

    if (editingLinkState.targetId.value === undefined && editingLinkState.sourceId.value === undefined) {
      throw new Error('state has no targetId and no sourceId')
    }

    const linkState = this.get(linkId)
    linkState.targetId.value = editingLinkState.targetId.value
    this.remove(editingLinkState.id)
  }

  swapSourceIndexes(nodeId: Id, dragIndex: number, hoverIndex: number): void {
    const linkStates = this.getLinksBySourceId(nodeId)
    const dragState = linkStates.find((s) => s.index.value === dragIndex)
    const hoverState = linkStates.find((s) => s.index.value === hoverIndex)
    assertDefined(dragState)
    assertDefined(hoverState)
    hoverState.index.value = dragIndex
    dragState.index.value = hoverIndex
  }
}
