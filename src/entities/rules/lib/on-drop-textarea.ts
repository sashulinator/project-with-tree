import { draggableCardType, editorRulesValuesType } from '../state/state'

export function onDropTextarea(
  array: editorRulesValuesType[],
  draggableCard: draggableCardType,
  id: string
): editorRulesValuesType[] {
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
