import { addToast } from '~/abstract/toast'
import { Box } from '~/utils/clipboard'
import { Id } from '~/utils/core'

import { NodeListController } from '..'
import { Point } from '../../..'

interface Context {
  nodeList: NodeListController
}

// TODO функция должна мочь копировать не только ноды
export function _copy(context: Context, ids: Id[]): void {
  const { nodeList } = context

  const copiedPoints = ids.map((id) => {
    const node = nodeList.get(id)
    return node.copy().serialize()
  })

  const pointListBox: Box<Point> = { action: 'copy', type: 'PointList', data: copiedPoints }

  const stringifiedJSON = JSON.stringify([pointListBox])

  navigator.clipboard
    .writeText(stringifiedJSON)
    .then(() => {
      addToast({ data: 'Скопировано', type: 'success' })
      nodeList.cutted.set([])
    })
    .catch((err) => {
      console.error(err)
      addToast({ data: 'Не удалось скопировать', type: 'error' })
    })
}
