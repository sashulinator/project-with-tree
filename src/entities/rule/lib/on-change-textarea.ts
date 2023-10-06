import { Id } from '~/utils/core'

import { EditorValues } from '../models/editorRulesValues'

export function onChangeTextarea(array: EditorValues[], id: Id, v: string): EditorValues[] {
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
