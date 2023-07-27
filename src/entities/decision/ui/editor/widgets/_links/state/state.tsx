import { RuleLinkState } from '../../_link'
import { Rule } from '~/entities/rule/types/rule'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { Id, assertDefined, invariant } from '~/utils/core'
import { Prop } from '~/utils/depricated-emitter'

export interface LinkStateProps {
  id: Id
  rule: Rule
}

type Events = {
  add: { item: RuleLinkState }
  update: { item: RuleLinkState }
  remove: { key: Id }
  editingId: { value: Id }

  targetId: { value: Id }
  sourceId: { value: Id }
  index: { value: number }
}

export class LinkStateDictionary extends EmitterableDictionary<Events, RuleLinkState> {
  editingId: Prop<'editingId', Id | undefined>

  constructor(linkStateList: RuleLinkState[]) {
    super(linkStateList, (l) => l.id.toString())

    this.editingId = new Prop<'editingId', Id | undefined>('editingId', undefined, this)
  }

  getEditingLinkState = (): RuleLinkState => {
    return this.get(this.editingId.value)
  }

  findEditingLinkState = (): RuleLinkState | undefined => {
    return this.find(this.editingId.value)
  }

  getLinksBySourceId = (id: Id): RuleLinkState[] => {
    return this.values().filter((state) => state.sourceId.value === id)
  }

  getLinksByTargetId = (id: Id): RuleLinkState[] => {
    return this.values().filter((state) => state.targetId.value === id)
  }

  startNewLink(nodeId: Id, newLinkId: Id, startLinkType: 'source' | 'target'): void {
    const editingLinkState = this.findEditingLinkState()
    invariant(!editingLinkState, 'You cannot start new Link while editing')
    const rule = { id: newLinkId }
    rule[startLinkType === 'target' ? 'targetId' : 'sourceId'] = nodeId
    this.add(RuleLinkState.createDefaultInstance(rule))
    this.editingId.value = newLinkId
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
    editingLinkState?.index.set(sourceLinksStates.length)

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
      const newState = RuleLinkState.createDefaultInstance({
        i: linkState.rule.i,
        targetId: linkState.rule.targetId,
      } as Partial<Rule>)
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
}
