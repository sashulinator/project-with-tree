import { Id } from '~/utils/core'

import { LinkListState, NodeListState } from '..'

interface Props {
  nodeListState: NodeListState
  linkListState: LinkListState
}

export function removeNodeClosure(props: Props): (id: Id) => void {
  return (id) => {
    const x = props.nodeListState.get(id).position.value.x
    props.nodeListState.remove(id)
    setTimeout(() => props.nodeListState.positionColumn(x))
    props.linkListState.values().forEach((s) => {
      if (s.sourceId.value !== id && s.targetId.value !== id) return
      props.linkListState.remove(s.id)
    })
  }
}
