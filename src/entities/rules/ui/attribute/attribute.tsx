import { c } from '~/utils/core'
import { AttributeProps } from '../../types/rules-type'
import { useSetRecoilState } from 'recoil'
import { draggableCardAtom } from '~/entities/rules/state/state'

import './attribute.css'
interface Props {
  attribute: AttributeProps
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}

Attribute.displayName = 'Attribute'

export function Attribute({ attribute, rootProps }: Props): JSX.Element {
  const setDraggableCard = useSetRecoilState(draggableCardAtom)

  const dragStart = (e: React.DragEvent<HTMLParagraphElement>): void => {
    e.stopPropagation()
    setDraggableCard({ id: attribute.nodeType, name: attribute.name })
  }

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
