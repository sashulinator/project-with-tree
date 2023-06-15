import { LinkState } from '~/entities/rule'
import { Rule } from '~/entities/rule/types/rule'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { Any, Id, assertDefined } from '~/utils/core'

export interface LinkStateProps {
  id: Id
  rule: Rule
}

type Events = {
  add: { item: LinkState }
  update: { item: LinkState }
  remove: { key: Id }
}

export class LinkStateDictionary extends EmitterableDictionary<Events, LinkState> {
  editingId: Id | undefined

  constructor(linkStateList: LinkState[]) {
    super(linkStateList, (l) => l.id.toString())

    this.editingId = undefined
    this.handleEditingId()
  }

  private handleEditingId = (): void => {
    this.on('add', ({ item }) => {
      if (item.rule.sourceId && item.rule.targetId) return
      this.editingId = item.id
    })
    this.on('update', ({ item }) => {
      if (item.rule.sourceId && item.rule.targetId) return
      this.editingId = item.id
    })
  }

  finishEditing = (nodeId: Id): void => {
    const link = this.get(this.editingId)
    assertDefined(this.editingId)
    const rule = { ...link.rule }
    if (!rule.sourceId) {
      rule.sourceId = nodeId
    } else {
      rule.targetId = nodeId
    }
    this.update(new LinkState({ id: rule.id, rule }))
    this.editingId = undefined
  }

  getLinksBySourceId = (id: Id): LinkState[] => {
    return this.values().filter((state) => state.rule.sourceId === id)
  }

  getLinksByTargetId = (id: Id): LinkState[] => {
    return this.values().filter((state) => state.rule.targetId === id)
  }
}
