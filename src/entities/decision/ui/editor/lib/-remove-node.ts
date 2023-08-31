import { Id } from '~/utils/core'

import { LinkListController, NodeListController } from '..'

interface Props {
  nodeList: NodeListController
  linkList: LinkListController
}

export function removeNode(props: Props): (id: Id) => void {
  return (id: Id) => {
    const x = props.nodeList.get(id).position.value.x
    props.nodeList.remove(id)
    setTimeout(() => props.nodeList.positionColumn(x))
    props.linkList.values().forEach((s) => {
      if (s.sourceId.value !== id && s.targetId.value !== id) return
      props.linkList.remove(s.id)
    })
  }
}
