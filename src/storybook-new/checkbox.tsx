export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  checked: boolean
}

export default function Checkbox(props: CheckboxProps): JSX.Element {
  return (
    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <input type='checkbox' {...props} />
      {props.placeholder}
    </label>
  )
}
