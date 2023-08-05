import { DraggableCard } from '../models/draggableCardAtom'
import { EditorValues } from '../models/editorRulesValuesAtom'

export function onDropTextarea(array: EditorValues[], draggableCard: DraggableCard, id: string): EditorValues[] {
  return array.map((arr) => {
    return {
      ...arr,
      valueArr: arr.valueArr.map((item) => {
        if (item.id === id) {
          return { ...item, value: `${item.value}@[${draggableCard.name}](${draggableCard.id})` }
        }
        return item
      }),
    }
  })
}
