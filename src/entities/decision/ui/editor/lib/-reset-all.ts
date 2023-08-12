import { LinkListState, NodeListState } from '..'

interface Props {
  nodeListState: NodeListState
  linkListState: LinkListState
}

export function resetAll(props: Props): () => void {
  return () => {
    props.linkListState.editingId.set(undefined)
    props.nodeListState.selection.set(new Set())
  }
}
