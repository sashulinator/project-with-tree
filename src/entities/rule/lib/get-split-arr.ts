import { generateId } from '~/utils/core/generate-id'

import { EditorValues, SelectValue } from '../models/editorRulesValues'

export const getSplitArr = (arr: EditorValues[], index: number): EditorValues[] => {
  const result = arr.map((item, i) => {
    if (index === i) {
      return item.valueArr.map((item) => {
        return { id: generateId(), valueArr: [item], condition: SelectValue.and }
      })
    }
    return item
  })

  return result.flat(1)
}
