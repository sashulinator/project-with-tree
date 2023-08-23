import { generateId } from '~/utils/core'

import { DraggableItem } from '../models/draggableItem'
import { EditorValues } from '../models/editorRulesValues'

export function onDropItemToCanvas(
  editorRulesValues: EditorValues[],
  draggableItem: DraggableItem,
  parentId: string | null = null,
  direction: 'down' | 'up' = 'down'
): EditorValues[] {
  const result = editorRulesValues.map((arr) => {
    if (arr.id === draggableItem?.parentId) {
      return { ...arr, valueArr: arr.valueArr.filter((item) => item.id !== draggableItem.id) }
    }

    return arr
  })
  if (!parentId) {
    if (direction === 'down') {
      return [...result, { id: generateId(), valueArr: [{ value: draggableItem.value, id: draggableItem.id }] }].filter(
        (item) => item.valueArr.length
      )
    } else {
      return [{ id: generateId(), valueArr: [{ value: draggableItem.value, id: draggableItem.id }] }, ...result].filter(
        (item) => item.valueArr.length
      )
    }
  }

  return result
    .map((item) => {
      if (item.id === parentId) {
        return [item, { id: generateId(), valueArr: [{ value: draggableItem.value, id: draggableItem.id }] }]
      }
      return item
    })
    .flat(1)
    .filter((item) => item.valueArr.length)
}
