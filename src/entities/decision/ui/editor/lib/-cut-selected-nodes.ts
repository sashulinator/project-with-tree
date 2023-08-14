import { notify } from '~/shared/notify'
import { emptyFn } from '~/utils/function/empty-fn'

import { NodeListState } from '..'

interface Props {
  nodeListState: NodeListState
}

export function cutSelectedNodes(props: Props): () => void {
  return () => {
    props.nodeListState.cutted.set([...props.nodeListState.selection.value])
    notify({ data: 'Вырезано', type: 'success' })
    navigator.clipboard.writeText('').then(emptyFn).catch(emptyFn)
  }
}
