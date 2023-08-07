import { EditorValues } from '../models/editorRulesValues'

export const getMergeArr = (arr: EditorValues[]): EditorValues[] => {
  const startArr: EditorValues[] = []
  const endArr: EditorValues[] = []
  let flag = false

  arr.forEach((item) => {
    if (!item.checked) {
      if (!flag) {
        startArr.push(item)
      } else {
        endArr.push(item)
      }
    } else {
      if (!flag) {
        flag = true
        startArr.push({ ...item, checked: false })
      } else {
        const elem = startArr.pop()
        if (elem) {
          startArr.push({ ...elem, valueArr: [...elem.valueArr, ...item.valueArr], checked: false })
        }
      }
    }
  })

  return [...startArr, ...endArr]
}
