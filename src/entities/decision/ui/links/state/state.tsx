import { LinkState } from '~/entities/rule'
import { Rule } from '~/entities/rule/types/rule'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { Id, assertDefined } from '~/utils/core'
import { Prop } from '~/utils/emitter'

export interface LinkStateProps {
  id: Id
  rule: Rule
}

type Events = {
  add: { item: LinkState }
  update: { item: LinkState }
  remove: { key: Id }
  editingId: { value: Id }
  rule: { id: Id; value: Rule }
}

export class LinkStateDictionary extends EmitterableDictionary<Events, LinkState> {
  editingId: Prop<'editingId', Id | undefined>

  constructor(linkStateList: LinkState[]) {
    super(linkStateList, (l) => l.id.toString())

    this.editingId = new Prop<'editingId', Id | undefined>('editingId', undefined, this)

    this.handleEditingId()
  }

  private handleEditingId = (): void => {
    this.on('add', ({ item }) => {
      if (item.rule.value.sourceId && item.rule.value.targetId) return
      this.editingId.value = item.id
    })
    this.on('update', ({ item }) => {
      if (item.rule.value.sourceId && item.rule.value.targetId) return
      this.editingId.value = item.id
    })
  }

  finishEditing = (nodeId: Id): void => {
    const linkState = this.get(this.editingId.value)
    assertDefined(this.editingId)
    const rule = { ...linkState.rule.value }
    if (!rule.sourceId) {
      rule.sourceId = nodeId
    } else {
      rule.targetId = nodeId
    }
    linkState.rule.value = rule
    this.editingId.value = undefined
  }

  getLinksBySourceId = (id: Id): LinkState[] => {
    return this.values().filter((state) => state.rule.value.sourceId === id)
  }

  getLinksByTargetId = (id: Id): LinkState[] => {
    return this.values().filter((state) => state.rule.value.targetId === id)
  }
}
