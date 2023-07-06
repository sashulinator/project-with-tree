import './button.css'

import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { emitter } from '~/shared/emitter'
import UnstyledButton, { UnstyledButtonProps } from '~/ui/unstyled-button'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

ButtonComponent.displayName = 'ui-Button'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonProps extends UnstyledButtonProps {}

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  return (
    <UnstyledButton
      {...props}
      ref={ref}
      className={clsx(props.className, ButtonComponent.displayName)}
      height={props.height ?? 'm'}
    />
  )
}

const Button = forwardRef(ButtonComponent)
export default Button
