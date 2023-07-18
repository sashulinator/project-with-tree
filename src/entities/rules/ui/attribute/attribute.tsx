import { c } from '~/utils/core'
import { IAttribute } from '../../types/rules-type'
import './attribute.css'

interface Props {
  attribute: IAttribute
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
  setActiveAttribute: React.Dispatch<React.SetStateAction<IAttribute | null>>
}

Attribute.displayName = 'Attribute'

export default function Attribute({ attribute, rootProps, setActiveAttribute }: Props): JSX.Element {
  return (
    <p
      draggable
      onDragStart={(e: React.DragEvent<HTMLParagraphElement>): void => {
        setActiveAttribute(attribute)
        console.log(e)
      }}
      className={c(Attribute.displayName, rootProps?.className)}
      style={{ ...rootProps?.style }}
    >
      {attribute.name}
    </p>
  )
}
