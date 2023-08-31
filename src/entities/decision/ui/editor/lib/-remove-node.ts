import { Id } from '~/utils/core'

import { LinkListController, NodeListController } from '..'

interface Props {
  nodeListController: NodeListController
  linkListController: LinkListController
}

export function removeNode(props: Props): (id: Id) => void {
  return (id: Id) => {
    const x = props.nodeListController.get(id).position.value.x
    props.nodeListController.remove(id)
    setTimeout(() => props.nodeListController.positionColumn(x))
    props.linkListController.values().forEach((s) => {
      if (s.sourceId.value !== id && s.targetId.value !== id) return
      props.linkListController.remove(s.id)
    })
  }
}
