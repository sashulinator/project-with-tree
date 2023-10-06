import { Id } from '~/utils/core'

import { DraggableCard } from '../../../models/draggableCard'
import { EditorValues } from '../models/editorRulesValues'

export function onDropTextarea(array: EditorValues[], draggableCard: DraggableCard, id: Id): EditorValues[] {
  return array.map((arr) => {
    return {
      ...arr,
      valueArr: arr.valueArr.map((item) => {
        if (item.id === id) {
          return { ...item, value: `${item.value}@[${draggableCard.name}](${draggableCard.type}, ${draggableCard.id})` }
        }
        return item
      }),
    }
  })
}
