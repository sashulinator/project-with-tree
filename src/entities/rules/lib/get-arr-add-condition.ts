import uniqid from 'uniqid'

import { EditorValues } from '../models/editorRulesValues'

export function getArrAddCondition(editorRulesValues: EditorValues[], id: string): EditorValues[] {
  const index = editorRulesValues.findIndex((item) => item.id === id)
  const result: EditorValues[] = []
  editorRulesValues.forEach((item, i) => {
    result.push(item)
    if (i === index) {
      result.push({
        id: uniqid(),
        valueArr: [{ id: uniqid(), value: '' }],
      })
    }
  })

  return result
}
