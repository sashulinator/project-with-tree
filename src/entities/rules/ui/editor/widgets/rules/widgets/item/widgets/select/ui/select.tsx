import './select.css'

interface SelectProps {
  id: string
  condition: 'И' | 'ИЛИ' | 'НЕ' | 'ИСКЛ ИЛИ' | null
}

Select.displayName = 'ruleEditor-w-Rules-w-Select'

export default function Select(props: SelectProps): JSX.Element {
  const options = ['И', 'ИЛИ', 'НЕ', 'ИСКЛ ИЛИ']

  const { id, condition } = props
  return (
    <select
      className={Select.displayName}
      name={`or-and-not${id}`}
      defaultValue={condition || 'И'}
      onChange={(e): void => console.log(e.target.value)}
    >
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      })}
    </select>
  )
}
