import './button.css'

import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import AbstractButton, { ButtonProps as AbstractButtonProps } from '~/abstract/button'
import { emitter } from '~/shared/emitter'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

ButtonComponent.displayName = 'ui-Button'

export interface ButtonProps extends Omit<AbstractButtonProps, 'height'> {
  height?: 's' | 'm' | 'l' | 'none'
}

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { height = 'm' } = props

  return (
    <AbstractButton
      {...props}
      ref={ref}
      className={clsx(props.className, ButtonComponent.displayName)}
      height={height === 'none' ? undefined : height}
    >
      <span>{props.children}</span>
    </AbstractButton>
  )
}

const Button = forwardRef(ButtonComponent)
export default Button
