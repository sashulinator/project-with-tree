import { DraggableItem } from '../models/draggableItem'
import { EditorValues, SelectValue } from '../models/editorRulesValues'

export function onDragEventItemToItem(
  editorValue: EditorValues[],
  parentId: string,
  id: string,
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
                  return [{ value: '', id: '', condition: SelectValue.and }, item]
                } else {
                  return [item, { value: '', id: '', condition: SelectValue.and }]
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
