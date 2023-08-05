import { EditorValues } from '../models/editorRulesValuesAtom'

export function getCheckedArr(arr: EditorValues[], check: boolean, id: string): EditorValues[] {
  return arr.map((item) => {
    if (item.id === id) {
      return { ...item, checked: check }
    }
    return item
  })
}
