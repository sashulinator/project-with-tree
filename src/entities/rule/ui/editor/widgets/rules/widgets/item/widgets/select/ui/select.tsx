import './select.css'

import { useRecoilState } from 'recoil'

import { getSelectArr } from '~/entities/rule/lib/get-select-arr'
import { SelectValue, editorRulesValuesAtom } from '~/entities/rule/models/editorRulesValues'

interface SelectProps {
  id: string
  condition: SelectValue
  parentId: string
}

Select.displayName = 'ruleEditor-w-Rules-w-Select'

export default function Select(props: SelectProps): JSX.Element {
  const options = [
    { value: SelectValue.and, title: 'И' },
    { value: SelectValue.or, title: 'ИЛИ' },
    { value: SelectValue.not, title: 'НЕ' },
    { value: SelectValue.xor, title: 'ИЛИ НЕ' },
  ]
  const [editorValue, setEditorValue] = useRecoilState(editorRulesValuesAtom)
  const { id, condition, parentId } = props

  return (
    <select
      className={Select.displayName}
      title={`or-and-not${id}`}
      value={condition}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => {
        const targetValue = e.target.value as SelectValue

        setEditorValue(getSelectArr(editorValue, targetValue, parentId, id))
      }}
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
