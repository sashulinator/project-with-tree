import './unstyled-button.css'

import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

export type UnstyledButtonProps = React.HTMLAttributes<HTMLButtonElement>

UnstyledButtonComponent.displayName = 'a-UnstyledButton'

function UnstyledButtonComponent(props: UnstyledButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return <button {...props} className={clsx(props.className, UnstyledButtonComponent.displayName)} ref={ref} />
}

const UnstyledButton = forwardRef(UnstyledButtonComponent)
export { UnstyledButton }
