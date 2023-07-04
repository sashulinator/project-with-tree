import { RuleLinkState } from '~/entities/rule'
import { Rule } from '~/entities/rule/types/rule'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { Id } from '~/utils/core'
import { Prop } from '~/utils/emitter'

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
}
