type Props = {
  obj: Record<string, string | number>
}

export default function TableAttribute({ obj }: Props): JSX.Element {
  return (
    <div style={{ display: 'flex' }}>
      {Object.keys(obj).map((key) => {
        return <div style={{ marginRight: '10px' }} key={key}>{`${key}: ${obj[key]}`}</div>
      })}
    </div>
  )
}
