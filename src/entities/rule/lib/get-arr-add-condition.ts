import { Id, generateId } from '~/utils/core'

import { EditorValues, SelectValue } from '../models/editorRulesValues'

export function getArrAddCondition(editorRulesValues: EditorValues[], id: Id, parentId: Id): EditorValues[] {
  const index = editorRulesValues.findIndex((item) => item.id === id)

  let result: EditorValues[] = []
  if (parentId === id) {
    editorRulesValues.forEach((item, i) => {
      result.push(item)
      if (i === index) {
        result.push({
          id: generateId(),
          valueArr: [{ id: generateId(), value: '', condition: SelectValue.and }],
          condition: SelectValue.and,
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
                return [item, { id: generateId(), value: '', condition: SelectValue.and }]
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
