import { generateId } from '~/utils/core'

import { EditorValues } from '../models/editorRulesValues'

export function getArrAddCondition(editorRulesValues: EditorValues[], id: string, parentId: string): EditorValues[] {
  const index = editorRulesValues.findIndex((item) => item.id === id)
  let result: EditorValues[] = []
  if (parentId === id) {
    editorRulesValues.forEach((item, i) => {
      result.push(item)
      if (i === index) {
        result.push({
          id: generateId(),
          valueArr: [{ id: generateId(), value: '' }],
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
                return [item, { id: generateId(), value: '' }]
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
