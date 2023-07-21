import { c } from '~/utils/core'
import { AttributeProps } from '../../types/rules-type'
import './attribute.css'
import { useSetRecoilState } from 'recoil'
import { activeAttributeAtom } from '~/entities/rules/state/state'

interface Props {
  attribute: AttributeProps
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}

Attribute.displayName = 'Attribute'

function Attribute({ attribute, rootProps }: Props): JSX.Element {
  const setActiveAttribute = useSetRecoilState(activeAttributeAtom)

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

export default Attribute
