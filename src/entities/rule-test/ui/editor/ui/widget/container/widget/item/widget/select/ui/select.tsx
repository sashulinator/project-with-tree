import './select.css'

import { RuleContainer, RuleItem } from '~/entities/rule-test/types/type'
import { SelectValue } from '~/entities/rule/models/editorRulesValues'

interface SelectProps {
  item: RuleItem | RuleContainer
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

  const { item, handleChangeSelect } = props

  return (
    <select
      value={item.condition}
      onChange={(e): void => handleChangeSelect(e.target.value as SelectValue)}
      className={Select.displayName}
      title={`or-and-not${item.id}`}
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
