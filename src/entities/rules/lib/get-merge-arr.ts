import { editorRulesValuesType as T } from '../state/state'

export const getMergeArr = (arr: T[]): T[] => {
  const startArr: T[] = []
  const endArr: T[] = []
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
