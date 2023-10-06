import { RuleContainer, RuleItem, RulesRes, SelectValue } from '../types/type'

export const getInitialData = (rule: RulesRes | null = null): [RuleContainer[], RuleItem[]] => {
  const initialValue = rule
    ? rule.frontValue
    : [
        {
          id: '5',
          valueArr: [{ id: '3', value: '', condition: SelectValue.and }],
          condition: SelectValue.and,
        },
      ]

  const newContainerList = initialValue.map((item) => {
    return { id: item.id, condition: item.condition }
  })

  const newRulesList: RuleItem[] = []

  initialValue.forEach((arr) => {
    arr.valueArr.forEach((item) => {
      newRulesList.push({ id: item.id, value: item.value, containerId: arr.id, condition: item.condition })
    })
  })

  return [newContainerList, newRulesList]
}
