import './button.css'

import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement>

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return <button {...props} className={clsx(props.className, 'a-Button')} ref={ref} />
}

const Button = forwardRef(ButtonComponent)
Button.displayName = 'AbstractButton'
export default Button
