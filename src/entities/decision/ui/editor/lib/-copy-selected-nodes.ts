import { addToast } from '~/abstract/toast'
import { Point } from '~/entities/point'
import { Box } from '~/utils/clipboard'

import { NodeListController } from '..'

interface Props {
  nodeListController: NodeListController
}

export function copySelectedNodes(props: Props): () => void {
  return () => {
    const copiedPoints = [...props.nodeListController.selection.value].map((id) => {
      const nodeController = props.nodeListController.get(id)
      return nodeController.copy().serialize()
    })

    const pointListBox: Box<Point> = { action: 'copy', type: 'PointList', data: copiedPoints }

    const stringifiedJSON = JSON.stringify([pointListBox])

    navigator.clipboard
      .writeText(stringifiedJSON)
      .then(() => {
        addToast({ data: 'Скопировано', type: 'success' })
        props.nodeListController.cutted.set([])
      })
      .catch((err) => {
        console.error(err)
        addToast({ data: 'Не удалось скопировать', type: 'error' })
      })
  }
}
