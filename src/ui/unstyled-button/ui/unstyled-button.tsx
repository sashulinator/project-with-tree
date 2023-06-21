import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

import Button from '~/abstract/button'

export type UnstyledButtonProps = React.HTMLAttributes<HTMLButtonElement>

function UnstyledButtonComponent(props: UnstyledButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return <Button {...props} className={clsx(props.className, 'ui-UnstyledButton')} ref={ref} />
}

const UnstyledButton = forwardRef(UnstyledButtonComponent)
UnstyledButton.displayName = 'UIUnstyledButton'
export default UnstyledButton
