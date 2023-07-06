import './button.css'

import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { emitter } from '~/shared/emitter'
import UnstyledButton, { UnstyledButtonProps } from '~/ui/unstyled-button'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

ButtonComponent.displayName = 'ui-Button'

export interface ButtonProps extends UnstyledButtonProps {
  variant?: 'outlined' | 'primary' | 'ghost'
}

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { variant = 'primary', ...restProps } = props

  return (
    <UnstyledButton
      {...restProps}
      ref={ref}
      className={clsx(`--${variant}`, props.className, ButtonComponent.displayName)}
    >
      {props.children}
    </UnstyledButton>
  )
}

const Button = forwardRef(ButtonComponent)
export default Button
