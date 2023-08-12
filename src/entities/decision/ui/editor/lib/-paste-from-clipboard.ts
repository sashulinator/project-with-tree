import uniqid from 'uniqid'

import { Point } from '~/entities/point'
import { notify } from '~/shared/notify'
import { Box } from '~/utils/clipboard'
import { has } from '~/utils/core'

import { NodeListState } from '..'

interface Props {
  nodeListState: NodeListState
  addNode: (point: Point) => void
}

export function pasteFromClipboard(props: Props): () => void {
  return () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        try {
          const boxList: unknown = JSON.parse(text)

          if (Array.isArray(boxList)) {
            boxList.forEach((box) => {
              if (isPointListBox(box)) {
                box.data.forEach((point) => {
                  if (box.action === 'cut') {
                    if (props.nodeListState.find(point.id)) {
                      props.nodeListState.remove(point.id)
                    }
                    setTimeout(() => props.addNode(point), 10)
                  } else {
                    props.addNode({ ...point, id: uniqid() })
                  }
                })
              }
            })
          }
        } catch {
          console.log(text)
        }
      })
      .catch(() => {
        notify({ type: 'error', data: 'Ошибка! Возможно, вы не дала разрешение на чтение данных из буфера обмена' })
      })
  }
}

function isPointListBox(value: unknown): value is Box<Point> {
  return has(value, 'type') && value.type === 'PointList'
}
