import { Id } from '~/utils/core'

import { NodeListController } from '..'

interface Props {
  nodeListController: NodeListController
  removeNode: (id: Id) => void
}

export function removeSelectedNodes(props: Props): () => void {
  return () => {
    props.nodeListController.selection.value.forEach((id) => {
      const state = props.nodeListController.get(id)
      if (state.point.level !== 'main') {
        props.removeNode(id)
      }
    })
    props.nodeListController.selection.set([])
  }
}
