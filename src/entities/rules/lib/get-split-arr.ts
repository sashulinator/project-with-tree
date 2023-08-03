import uniqid from 'uniqid'
import { editorRulesValuesType } from '../state/state'

export const getSplitArr = (arr: editorRulesValuesType[], index: number): editorRulesValuesType[] => {
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
