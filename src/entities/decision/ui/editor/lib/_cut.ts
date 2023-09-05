import { notify } from '~/shared/notify'
import { Id } from '~/utils/core'
import { emptyFn } from '~/utils/function/empty-fn'

import { NodeListController } from '..'

interface Context {
  nodeList: NodeListController
}

export function _cut(context: Context, ids: Id[]): void {
  const { nodeList } = context

  nodeList.cutted.set(ids)
  notify({ data: 'Вырезано', type: 'success' })
  navigator.clipboard.writeText('').then(emptyFn).catch(emptyFn)
}
