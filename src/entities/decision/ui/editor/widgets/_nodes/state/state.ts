import { NodeState } from '~/entities/point'
import { Rule } from '~/entities/rule/types/rule'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { assertNotNull, Id, Position } from '~/utils/core'
import { getStyle } from '~/utils/dom'

const YGAP = 24

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

  gridDepth = (x: number): void => {
    const depthNodes = this.values()
      .filter((state) => state.position.value.x === x)
      .sort((a, b) => a.position.value.y - b.position.value.y)

    const nodesHeight = depthNodes.reduce((acc, state) => {
      const style = getStyle(state.ref.value)
      assertNotNull(style)
      acc += parseInt(style.height, 10)
      return acc
    }, 0)

    const depthHeight = nodesHeight + depthNodes.length * YGAP
    const depthTop = depthHeight / -2

    let nextY = depthTop

    depthNodes.forEach((state) => {
      state.position.value = { ...state.position.value, y: nextY }
      const style = getStyle(state.ref.value)
      assertNotNull(style)
      const height = parseInt(style.height, 10)
      nextY += height + YGAP
    })
  }
}
