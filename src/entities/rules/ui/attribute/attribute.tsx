import { c } from '~/utils/core'
import { IAttribute } from '../../types/rules-type'
import './attribute.css'
import { useRecoilState } from 'recoil'
import { activeAttributeAtom } from '~/pages/rules/state'

interface Props {
  attribute: IAttribute
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}

Attribute.displayName = 'Attribute'

export default function Attribute({ attribute, rootProps }: Props): JSX.Element {
  const [, setActiveAttribute] = useRecoilState(activeAttributeAtom)

  const dragStart = (): void => setActiveAttribute(attribute)

  return (
    <p
      draggable
      onDragStart={dragStart}
      className={c(Attribute.displayName, rootProps?.className)}
      style={{ ...rootProps?.style }}
    >
      {attribute.name}
    </p>
  )
}
