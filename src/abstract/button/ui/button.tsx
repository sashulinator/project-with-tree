import './button.css'

import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { UnstyledButton } from '../widgets/unstyled-button'

ButtonComponent.displayName = 'a-Button'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  height?: 's' | 'm' | 'l' | null | undefined
  square?: boolean | undefined
  round?: boolean | undefined
}

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { height = 'm', square, round, ...restProps } = props

  return (
    <UnstyledButton
      {...restProps}
      ref={ref}
      className={clsx(
        ButtonComponent.displayName,
        height && `--${height}`,
        square && '--square',
        round && `--square --round`,
        props.className
      )}
    >
      {props.children}
    </UnstyledButton>
  )
}

const Button = forwardRef(ButtonComponent)
Button.displayName = ButtonComponent.displayName
export default Button
