import { EditorValues } from '../models/editorRulesValues'

export function getCheckedArr(arr: EditorValues[], check: boolean, id: string): EditorValues[] {
  return arr.map((item) => {
    if (item.id === id) {
      return { ...item, checked: check }
    }
    return item
  })
}
