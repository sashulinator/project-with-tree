import './attribute.css'

import { AttributeRes } from '~/api/domain/types/attribute'
import { GhostButton, GhostButtonProps } from '~/ui/button'
import { Close } from '~/ui/icon'
import { c } from '~/utils/core'

/**
 * attribute: AttributeRes
 *
 * wrapperProps?: React.HTMLAttributes<HTMLElement>
 *
 * titleProps?: React.HTMLAttributes<HTMLElement>
 *
 * closeButtonProps?: GhostButtonProps
 */
export interface AttributeProps {
  attribute: AttributeRes
  wrapperProps?: React.HTMLAttributes<HTMLElement>
  titleProps?: React.HTMLAttributes<HTMLElement>
  closeButtonProps?: GhostButtonProps
}

Attribute.displayName = 'e-ui-attribute'

export default function Attribute(props: AttributeProps): JSX.Element {
  const { attribute } = props
  return (
    <div {...props.wrapperProps} className={c(props.wrapperProps?.className, Attribute.displayName)}>
      <h2 {...props.titleProps}>{attribute?.name ? attribute.name : 'нет имени'}</h2>
      <GhostButton {...props.closeButtonProps}>
        <Close />
      </GhostButton>
    </div>
  )
}
