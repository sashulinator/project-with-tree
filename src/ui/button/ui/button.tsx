import './button.css'

import { ForwardedRef, forwardRef } from 'react'

import AbstractButton, { ButtonProps as AbstractButtonProps } from '~/abstract/button'
import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

ButtonComponent.displayName = 'ui-Button'

export interface ButtonProps extends Omit<AbstractButtonProps, 'height'> {
  height?: 's' | 'm' | 'l' | null | undefined
}

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { height = 'm' } = props

  return (
    <AbstractButton {...props} ref={ref} className={c(props.className, ButtonComponent.displayName)} height={height}>
      <span>{props.children}</span>
    </AbstractButton>
  )
}

const Button = forwardRef(ButtonComponent)
Button.displayName = ButtonComponent.displayName
export default Button
