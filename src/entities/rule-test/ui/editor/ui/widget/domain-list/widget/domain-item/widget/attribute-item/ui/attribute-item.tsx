import './attribute-item.css'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import Flex, { FlexProps } from '~/abstract/flex'
import { Attribute } from '~/entities/attribute'
import { c } from '~/utils/core'

export interface Props {
  attribute: Attribute
  wrapperProps?: FlexProps
  titleProps?: React.HTMLAttributes<HTMLElement>
  isRightToEdit?: boolean
}

AttributeItem.displayName = 'e-Rule-w-AttributeItem'

export default function AttributeItem(props: Props): JSX.Element {
  const { attribute } = props

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: attribute.id,
    data: {
      type: 'Attribute',
      attribute: attribute,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      {...props.wrapperProps}
      className={c(props.wrapperProps?.className, AttributeItem.displayName)}
    >
      <Flex crossAxis='center' gap='xxl'>
        <span className='dots'></span>
        <div {...props.titleProps}>{attribute?.name || 'нет имени'}</div>
      </Flex>
    </div>
  )
}
