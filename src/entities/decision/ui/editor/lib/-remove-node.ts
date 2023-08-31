import { Id } from '~/utils/core'

import { LinkListController, NodeListState } from '..'

interface Props {
  nodeListState: NodeListState
  linkListController: LinkListController
}

export function removeNode(props: Props): (id: Id) => void {
  return (id: Id) => {
    const x = props.nodeListState.get(id).position.value.x
    props.nodeListState.remove(id)
    setTimeout(() => props.nodeListState.positionColumn(x))
    props.linkListController.values().forEach((s) => {
      if (s.sourceId.value !== id && s.targetId.value !== id) return
      props.linkListController.remove(s.id)
    })
  }
}
