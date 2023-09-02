import { notify } from '~/shared/notify'
import { Box } from '~/utils/clipboard'
import { generateId, has } from '~/utils/core'

import { NodeListController } from '..'
import { Point } from '../../..'

interface Context {
  nodeList: NodeListController
  addNode: (point: Point) => void
}

export function _pasteFromClipboard(context: Context): void {
  const { nodeList, addNode } = context

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
                  if (nodeList.find(point.id)) {
                    nodeList.remove(point.id)
                  }
                  setTimeout(() => addNode(point), 10)
                } else {
                  addNode({ ...point, id: generateId() })
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

function isPointListBox(value: unknown): value is Box<Point> {
  return has(value, 'type') && value.type === 'PointList'
}
