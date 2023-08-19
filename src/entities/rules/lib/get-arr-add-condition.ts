import uniqid from 'uniqid'

import { EditorValues } from '../models/editorRulesValues'

export function getArrAddCondition(editorRulesValues: EditorValues[], id: string, parentId: string): EditorValues[] {
  const index = editorRulesValues.findIndex((item) => item.id === id)
  let result: EditorValues[] = []
  if (parentId === id) {
    editorRulesValues.forEach((item, i) => {
      result.push(item)
      if (i === index) {
        result.push({
          id: uniqid(),
          valueArr: [{ id: uniqid(), value: '' }],
        })
      }
    })
  } else {
    result = editorRulesValues.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          valueArr: item.valueArr
            .map((item) => {
              if (item.id === id) {
                return [item, { id: uniqid(), value: '' }]
              }
              return item
            })
            .flat(1),
        }
      }
      return item
    })
  }

  return result
}
