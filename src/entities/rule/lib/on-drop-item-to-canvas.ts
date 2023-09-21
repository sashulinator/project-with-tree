import { Id, generateId } from '~/utils/core'

import { DraggableItem } from '../models/draggableItem'
import { EditorValues, SelectValue } from '../models/editorRulesValues'

export function onDropItemToCanvas(
  editorRulesValues: EditorValues[],
  draggableItem: DraggableItem,
  parentId: Id | null = null,
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
      return [
        ...result,
        {
          id: generateId(),
          valueArr: [{ value: draggableItem.value, id: draggableItem.id, condition: draggableItem.condition }],
          condition: SelectValue.and,
        },
      ].filter((item) => item.valueArr.length)
    } else {
      return [
        {
          id: generateId(),
          valueArr: [{ value: draggableItem.value, id: draggableItem.id, condition: draggableItem.condition }],
          condition: SelectValue.and,
        },
        ...result,
      ].filter((item) => item.valueArr.length)
    }
  }

  return result
    .map((item) => {
      if (item.id === parentId) {
        return [
          item,
          {
            id: generateId(),
            condition: SelectValue.and,
            valueArr: [{ value: draggableItem.value, id: draggableItem.id, condition: draggableItem.condition }],
          },
        ]
      }
      return item
    })
    .flat(1)
    .filter((item) => item.valueArr.length)
}
