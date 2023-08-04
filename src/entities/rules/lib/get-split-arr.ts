import uniqid from 'uniqid'
import { EditorValues } from '../models/editorRulesValuesAtom'

export const getSplitArr = (arr: EditorValues[], index: number): EditorValues[] => {
  const result = arr.map((item, i) => {
    if (index === i) {
      return item.valueArr.map((item) => {
        return { id: uniqid(), valueArr: [{ id: item.id, value: item.value }] }
      })
    }
    return item
  })

  return result.flat(1)
}
