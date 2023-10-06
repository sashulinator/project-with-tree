import { Id } from '~/utils/core'

import { EditorValues, SelectValue } from '../models/editorRulesValues'

export function getSelectArr(
  editorValue: EditorValues[],
  targetValue: SelectValue,
  parentId: Id,
  id: Id
): EditorValues[] {
  const result = editorValue.map((arr) => {
    if (parentId === id) {
      if (arr.id === id) {
        return { ...arr, condition: targetValue }
      }
      return arr
    } else {
      return {
        ...arr,
        valueArr: arr.valueArr.map((item) => {
          if (item.id === id) {
            return { ...item, condition: targetValue }
          }
          return item
        }),
      }
    }
  })

  return result
}
