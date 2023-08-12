import { addToast } from '~/abstract/toast'
import { Point } from '~/entities/point'
import { Box } from '~/utils/clipboard'

import { NodeListState } from '..'

interface Props {
  nodeListState: NodeListState
}

export function copySelectedNodes(props: Props): () => void {
  return () => {
    const copiedPoints = [...props.nodeListState.selection.value].map((id) => {
      const nodeState = props.nodeListState.get(id)
      return nodeState.copy().serialize()
    })

    const pointListBox: Box<Point> = { action: 'copy', type: 'PointList', data: copiedPoints }

    const stringifiedJSON = JSON.stringify([pointListBox])

    navigator.clipboard
      .writeText(stringifiedJSON)
      .then(() => {
        addToast({ data: 'Скопировано', type: 'success' })
      })
      .catch((err) => {
        console.error(err)
        addToast({ data: 'Не удалось скопировать', type: 'error' })
      })
  }
}
