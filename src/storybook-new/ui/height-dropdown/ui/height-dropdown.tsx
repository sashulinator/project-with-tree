export function HeightDropdown(props: { value: 'm'; onChange: (v: 'm') => void }): JSX.Element {
  const options = ['s', 'm', 'l', 'null']
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
      onChange={(e): void => {
        const { value } = e.target
        const newValue = value === 'null' ? null : value
        props.onChange(newValue as 'm')
      }}
      value={props.value}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
