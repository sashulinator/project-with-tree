import { EditorValues } from '../models/editorRulesValuesAtom'

export function onChangeTextarea(array: EditorValues[], id: string, v: string): EditorValues[] {
  return array.map((arr) => {
    return {
      ...arr,
      valueArr: arr.valueArr.map((item) => {
        if (item.id === id) {
          return { ...item, value: v }
        }
        return item
      }),
    }
  })
}
