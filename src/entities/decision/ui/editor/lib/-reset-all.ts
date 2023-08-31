import { LinkListController, NodeListController } from '..'

interface Props {
  nodeListController: NodeListController
  linkListController: LinkListController
}

export function resetAll(props: Props): () => void {
  return () => {
    props.linkListController.editingId.set(undefined)
    props.nodeListController.selection.set([])
  }
}
