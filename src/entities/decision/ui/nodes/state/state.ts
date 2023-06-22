import { NodeState } from '~/entities/point'
import { Rule } from '~/entities/rule/types/rule'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { Id, Position } from '~/utils/core'

export interface NodeStateProps {
  id: Id
  rule: Rule
}

type Events = {
  add: { item: NodeState }
  update: { item: NodeState }
  remove: { key: Id }
  position: { id: Id; value: Position }
}

export class NodeStateDictionary extends EmitterableDictionary<Events, NodeState> {
  constructor(linkStateList: NodeState[]) {
    super(linkStateList, (l) => l.id.toString())
  }
}
