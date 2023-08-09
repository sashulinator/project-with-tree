import './select.css'

interface SelectProps {
  id: string
}

Select.displayName = 'ruleEditor-w-Rules-w-Select'

export default function Select(props: SelectProps): JSX.Element {
  const options = ['И', 'ИЛИ', 'НЕ', 'ИСКЛ ИЛИ']

  const { id } = props
  return (
    <select className={Select.displayName} name={`or-and-not${id}`} defaultValue={'И'}>
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
