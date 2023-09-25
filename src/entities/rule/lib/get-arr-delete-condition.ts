import { Id } from '~/utils/core'

import { EditorValues } from '../models/editorRulesValues'

export function getArrDeleteCondition(editorRulesValues: EditorValues[], id: Id, parentId: Id): EditorValues[] {
  let result: EditorValues[] = []

  if (parentId === id) {
    result = editorRulesValues.filter((item) => item.id !== id)
  } else {
    result = editorRulesValues
      .map((arr) => {
        if (arr.valueArr.length !== 1) {
          return { ...arr, valueArr: arr.valueArr.filter((item) => item.id !== id) }
        }
        return { ...arr, valueArr: arr.valueArr.filter(() => arr.id !== id) }
      })
      .filter((arr) => arr.valueArr.length > 0)
  }

  return result
}
