import './item.css'

import { useSetRecoilState } from 'recoil'

import Flex, { FlexProps } from '~/abstract/flex'
import { Attribute } from '~/entities/attribute/types/attribute'
import { draggableCardAtom } from '~/models/draggableCard'
import { GhostButton, GhostButtonProps } from '~/ui/button'
import { Close } from '~/ui/icon'
import { Id, c } from '~/utils/core'

export interface Props {
  attribute: Attribute
  isDraggable: boolean
  wrapperProps?: FlexProps
  titleProps?: React.HTMLAttributes<HTMLElement>
  closeButtonProps?: GhostButtonProps
  isRightToEdit?: boolean
  removeAttribute?: (id: Id) => void
}

Item.displayName = 'e-Attribute-ui-Item'

export default function Item(props: Props): JSX.Element {
  const { attribute, removeAttribute = (): void => {} } = props

  const setDraggableCard = useSetRecoilState(draggableCardAtom)

  const dragStart = (e: React.DragEvent<HTMLParagraphElement>): void => {
    e.stopPropagation()
    setDraggableCard({ id: attribute.id, name: attribute.name, type: 'attribute' })
  }

  return (
    <Flex
      draggable={props.isDraggable}
      onDrag={dragStart}
      crossAxis='center'
      mainAxis='space-between'
      {...props.wrapperProps}
      className={c(props.wrapperProps?.className, Item.displayName)}
    >
      <Flex crossAxis='center' gap='xxl'>
        <span className='dots'></span>
        <div {...props.titleProps}>{attribute?.name || 'нет имени'}</div>
      </Flex>

      {!!props.isRightToEdit && (
        <GhostButton square onClick={(): void => removeAttribute(props.attribute.id)} {...props.closeButtonProps}>
          <Close />
        </GhostButton>
      )}
    </Flex>
  )
}