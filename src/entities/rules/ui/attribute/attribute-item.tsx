import { Attribute } from '../../types/rules-type'

interface Props {
  attribute: Attribute
}

export default function AttributeItem({ attribute }: Props): JSX.Element {
  return (
    <li
      style={{
        textAlign: 'center',
        padding: '10px',
        border: '1px solid blue',
        margin: '10px 10px',
        cursor: 'grab',
      }}
    >
      {attribute.name}
    </li>
  )
}
