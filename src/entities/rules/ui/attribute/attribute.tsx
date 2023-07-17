import { c } from '~/utils/core'
import { Attribute } from '../../types/rules-type'
import './attribute.css'

interface Props {
  attribute: Attribute
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}

Attribute.displayName = 'Attribute'

export default function Attribute({ attribute, rootProps }: Props): JSX.Element {
  return (
    <p
      draggable
      onDragStart={(e: React.DragEvent<HTMLParagraphElement>): void => {
        console.log(e)
      }}
      className={c(Attribute.displayName, rootProps?.className)}
      style={{ ...rootProps?.style }}
    >
      {attribute.name}
    </p>
  )
}
