import './item.css'

import Flex, { FlexProps } from '~/abstract/flex'
import { AttributeRes } from '~/api/domain/types/attribute'
import { GhostButton, GhostButtonProps } from '~/ui/button'
import { Close } from '~/ui/icon'
import { Id, c } from '~/utils/core'

export interface Props {
  attribute: AttributeRes
  wrapperProps?: FlexProps
  titleProps?: React.HTMLAttributes<HTMLElement>
  closeButtonProps?: GhostButtonProps
  removeAttribute: (id: Id) => void
}

Item.displayName = 'e-Attribute-ui-Item'

export default function Item(props: Props): JSX.Element {
  const { attribute } = props

  return (
    <Flex
      crossAxis='center'
      mainAxis='space-between'
      {...props.wrapperProps}
      className={c(props.wrapperProps?.className, Item.displayName)}
    >
      <Flex crossAxis='center' gap='xxl'>
        <span className='dots'></span>
        <div {...props.titleProps}>{attribute?.name || 'нет имени'}</div>
      </Flex>

      <GhostButton square onClick={(): void => props.removeAttribute(props.attribute.id)} {...props.closeButtonProps}>
        <Close />
      </GhostButton>
    </Flex>
  )
}
