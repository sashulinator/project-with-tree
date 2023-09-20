import './select.css'

import { RuleItem } from '~/entities/rule-test/types/type'
import { SelectValue } from '~/entities/rule/models/editorRulesValues'

interface SelectProps {
  rule: RuleItem
  handleChangeSelect: (option: SelectValue) => void
}

Select.displayName = 'ruleEditor-w-Rules-w-Select'

export default function Select(props: SelectProps): JSX.Element {
  const options = [
    { value: SelectValue.and, title: 'И' },
    { value: SelectValue.or, title: 'ИЛИ' },
    { value: SelectValue.not, title: 'НЕ' },
    { value: SelectValue.xor, title: 'ИЛИ НЕ' },
  ]

  const { rule, handleChangeSelect } = props

  return (
    <select
      value={rule.condition}
      onChange={(e): void => handleChangeSelect(e.target.value as SelectValue)}
      className={Select.displayName}
      title={`or-and-not${rule.id}`}
    >
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        )
      })}
    </select>
  )
}
