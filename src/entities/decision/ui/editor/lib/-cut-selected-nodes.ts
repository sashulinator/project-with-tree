import { Point } from '~/entities/point'
import { notify } from '~/shared/notify'
import { Box } from '~/utils/clipboard'

import { NodeListState } from '..'

interface Props {
  nodeListState: NodeListState
}

export function cutSelectedNodes(props: Props): () => void {
  return () => {
    const cutPoints = [...props.nodeListState.selection.value.values()].map((id) => {
      const nodeState = props.nodeListState.get(id)
      props.nodeListState.remove(id)
      setTimeout(() => props.nodeListState.positionColumn(nodeState.position.value.x))
      return nodeState.serialize()
    })

    const pointListBox: Box<Point> = { action: 'cut', type: 'PointList', data: cutPoints }

    const stringifiedJSON = JSON.stringify([pointListBox])

    navigator.clipboard
      .writeText(stringifiedJSON)
      .then(() => {
        notify({ data: 'Вырезано', type: 'success' })
      })
      .catch((err) => {
        console.error(err)
        notify({ data: 'Не удалось вырезать', type: 'error' })
      })
  }
}
