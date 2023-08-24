import './attribute.css'

import { useSetRecoilState } from 'recoil'

import { draggableCardAtom } from '~/entities/rules/models/draggableCard'
import { AttributeRes } from '~/entities/rules/types/rules-type'
import { c } from '~/utils/core'

interface Props {
  attribute: AttributeRes
  rootProps?: React.HTMLAttributes<HTMLDivElement> | undefined
}

Attribute.displayName = 'e-Rules-ui-DomainList-Attribute'

export default function Attribute({ attribute, rootProps }: Props): JSX.Element {
  const setDraggableCard = useSetRecoilState(draggableCardAtom)

  const dragStart = (e: React.DragEvent<HTMLParagraphElement>): void => {
    e.stopPropagation()
    setDraggableCard({ id: attribute.id, name: attribute.name })
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
