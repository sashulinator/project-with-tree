import { EditorValues, RuleContainer, RuleItem } from '../types/type'

export const getEditorValue = (containerList: RuleContainer[], rules: RuleItem[]): EditorValues[] => {
  const result: EditorValues[] = []
  containerList.forEach((container) => {
    result.push({
      id: container.id,
      condition: container.condition,
      valueArr: rules
        .filter((rule) => rule.containerId === container.id)
        .map((item) => ({ id: item.id, value: item.value, condition: item.condition })),
    })
  })

  return result
}
