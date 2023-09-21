import './attribute-item.css'

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

  return (
    <Flex
      crossAxis='center'
      mainAxis='space-between'
      {...props.wrapperProps}
      className={c(props.wrapperProps?.className, AttributeItem.displayName)}
    >
      <Flex crossAxis='center' gap='xxl'>
        <span className='dots'></span>
        <div {...props.titleProps}>{attribute?.name || 'нет имени'}</div>
      </Flex>
    </Flex>
  )
}
