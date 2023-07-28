import { editorRulesValuesType } from '../state/state'

export function getCheckedArr(arr: editorRulesValuesType[], check: boolean, id: string): editorRulesValuesType[] {
  return arr.map((item) => {
    if (item.id === id) {
      return { ...item, checked: check }
    }
    return item
  })
}
