interface Props {
  name: string
  value: string | number
}

export default function Attribute({ name, value }: Props): JSX.Element {
  return (
    <div>
      <span style={{ color: 'blue' }}>{`${name}: `}</span>
      {value}
    </div>
  )
}
