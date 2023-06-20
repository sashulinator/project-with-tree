import { LinkState } from '~/entities/rule'
import { Rule } from '~/entities/rule/types/rule'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { Id } from '~/utils/core'
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
  }

  getEditingLinkState = (): LinkState => {
    return this.get(this.editingId.value)
  }

  findEditingLinkState = (): LinkState | undefined => {
    return this.find(this.editingId.value)
  }

  getLinksBySourceId = (id: Id): LinkState[] => {
    return this.values().filter((state) => state.rule.value.sourceId === id)
  }

  getLinksByTargetId = (id: Id): LinkState[] => {
    return this.values().filter((state) => state.rule.value.targetId === id)
  }
}
