import { Id } from '~/utils/core'

import { DraggableItem } from '../models/draggableItem'
import { EditorValues } from '../models/editorRulesValues'

export function onDropItemToItem(
  editorValue: EditorValues[],
  parentId: Id,
  id: Id | null,
  draggableItem: DraggableItem,
  direction: 'up' | 'down' = 'down'
): EditorValues[] {
  const result = editorValue
    .map((arr) => {
      if (arr.id === parentId) {
        return {
          ...arr,
          valueArr: arr.valueArr
            .filter((item) => item.id !== draggableItem?.id)
            .map((item) => {
              if (item.id === id && draggableItem) {
                if (direction === 'up') {
                  return [
                    { value: draggableItem.value, id: draggableItem.id, condition: draggableItem.condition },
                    item,
                  ]
                } else {
                  return [
                    item,
                    { value: draggableItem.value, id: draggableItem.id, condition: draggableItem.condition },
                  ]
                }
              }
              return item
            })
            .flat(1),
        }
      }
      return { ...arr, valueArr: arr.valueArr.filter((item) => item.id !== draggableItem?.id) }
    })
    .filter((item) => item.valueArr.length)

  return result
}
