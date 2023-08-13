import './unstyled-button.css'

import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

export type UnstyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

UnstyledButtonComponent.displayName = 'a-Button-w-Unstyled'

function UnstyledButtonComponent(props: UnstyledButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return (
    <button
      {...props}
      type={props.type || 'button'}
      className={clsx(props.className, UnstyledButtonComponent.displayName)}
      ref={ref}
    />
  )
}

const UnstyledButton = forwardRef(UnstyledButtonComponent)
UnstyledButton.displayName = UnstyledButtonComponent.displayName
export { UnstyledButton }
