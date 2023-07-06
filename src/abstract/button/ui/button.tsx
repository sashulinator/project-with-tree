import './button.css'

import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement>

ButtonComponent.displayName = 'a-Button'

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return <button {...props} className={clsx(props.className, ButtonComponent.displayName)} ref={ref} />
}

const Button = forwardRef(ButtonComponent)
export default Button
