import './item.css'

import Flex, { FlexProps } from '~/abstract/flex'
import { AttributeRes } from '~/api/domain/types/attribute'
import { GhostButton, GhostButtonProps } from '~/ui/button'
import { Close } from '~/ui/icon'
import { Id, c } from '~/utils/core'

export interface AttributeProps {
  attribute: AttributeRes
  wrapperProps?: FlexProps
  titleProps?: React.HTMLAttributes<HTMLElement>
  closeButtonProps?: GhostButtonProps
  removeAttribute: (id: Id) => void
}

Item.displayName = 'e-Attribute-ui-Item'
/**
 * attribute: AttributeRes
 *
 * wrapperProps?: React.HTMLAttributes<HTMLElement>
 *
 * titleProps?: React.HTMLAttributes<HTMLElement>
 *
 * closeButtonProps?: GhostButtonProps
 */
export default function Item(props: AttributeProps): JSX.Element {
  const { attribute } = props

  return (
    <Flex
      crossAxis='center'
      mainAxis='space-between'
      {...props.wrapperProps}
      className={c(props.wrapperProps?.className, Item.displayName)}
    >
      <div {...props.titleProps}>{attribute?.name || 'нет имени'}</div>
      <GhostButton onClick={(): void => props.removeAttribute(props.attribute.id)} {...props.closeButtonProps}>
        <Close />
      </GhostButton>
    </Flex>
  )
}
