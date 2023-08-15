import uniqid from 'uniqid'

import { DraggableItem } from '../models/draggableItem'
import { EditorValues } from '../models/editorRulesValues'

export function onDropItemToCanvas(editorRulesValues: EditorValues[], draggableItem: DraggableItem): EditorValues[] {
  const result = editorRulesValues.map((arr) => {
    if (arr.id === draggableItem?.parentId) {
      return { ...arr, valueArr: arr.valueArr.filter((item) => item.id !== draggableItem.id) }
    }

    return arr
  })

  return [...result, { id: uniqid(), valueArr: [{ value: draggableItem.value, id: draggableItem.id }] }].filter(
    (item) => item.valueArr.length
  )
}
