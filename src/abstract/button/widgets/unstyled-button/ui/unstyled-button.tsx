import './unstyled-button.css'

import React, { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

export type UnstyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

UnstyledButtonComponent.displayName = 'a-Button-w-Unstyled'

function UnstyledButtonComponent(props: UnstyledButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return (
    <button
      {...props}
      type={props.type || 'button'}
      className={c(props.className, UnstyledButtonComponent.displayName)}
      ref={ref}
    />
  )
}

const UnstyledButton = forwardRef(UnstyledButtonComponent)
UnstyledButton.displayName = UnstyledButtonComponent.displayName
export { UnstyledButton }
