import { LinkState } from '~/entities/rule'
import { Rule } from '~/entities/rule/types/rule'
import { Any, Id } from '~/utils/core'
import { EmitterableDictionary } from '~/utils/emitter/dictionary'

export interface LinkStateProps {
  id: Id
  rule: Rule
}

export class LinkStateDictionary extends EmitterableDictionary<Any, LinkState<Any>> {
  constructor(linkStateList: LinkState<Any>[]) {
    super(linkStateList, (l) => l.id.toString())
  }

  getLinksBySourceId = (id: Id): LinkState<Any>[] => {
    return this.values().filter((state) => state.rule.sourceId === id)
  }

  getLinksByTargetId = (id: Id): LinkState<Any>[] => {
    return this.values().filter((state) => state.rule.targetId === id)
  }
}
