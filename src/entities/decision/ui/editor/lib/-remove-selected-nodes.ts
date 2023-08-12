import { Id } from '~/utils/core'

import { NodeListState } from '..'

interface Props {
  nodeListState: NodeListState
  removeNode: (id: Id) => void
}

export function removeSelectedNodes(props: Props): () => void {
  return () => {
    props.nodeListState.selection.value.forEach((id) => {
      const state = props.nodeListState.get(id)
      if (state.point.type !== 'ENTER') {
        props.removeNode(id)
      }
    })
  }
}
