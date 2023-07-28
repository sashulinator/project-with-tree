import { editorRulesValuesType } from '../state/state'

export function onChangeTextarea(array: editorRulesValuesType[], id: string, v: string): editorRulesValuesType[] {
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
