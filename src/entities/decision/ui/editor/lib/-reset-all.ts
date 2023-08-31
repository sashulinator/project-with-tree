import { LinkListController, NodeListState } from '..'

interface Props {
  nodeListState: NodeListState
  linkListController: LinkListController
}

export function resetAll(props: Props): () => void {
  return () => {
    props.linkListController.editingId.set(undefined)
    props.nodeListState.selection.set([])
  }
}
