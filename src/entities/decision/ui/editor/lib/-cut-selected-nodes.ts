import { notify } from '~/shared/notify'
import { emptyFn } from '~/utils/function/empty-fn'

import { NodeListController } from '..'

interface Props {
  nodeListController: NodeListController
}

// TODO функция должна быть `cutNodes`
export function cutSelectedNodes(props: Props): () => void {
  return () => {
    props.nodeListController.cutted.set([...props.nodeListController.selection.value])
    notify({ data: 'Вырезано', type: 'success' })
    navigator.clipboard.writeText('').then(emptyFn).catch(emptyFn)
  }
}
