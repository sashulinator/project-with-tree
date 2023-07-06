import './button.css'

import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { emitter } from '~/shared/emitter'
import UnstyledButton from '~/ui/unstyled-button'
import { Any } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Dictionary<Any> {
  className?: undefined | string
  height?: 's' | 'm' | 'l'
  square?: boolean
  round?: boolean
  variant?: 'outlined' | 'primary' | 'ghost'
}

function ButtonComponent(props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { height = 'm', variant = 'primary', square, round } = props

  return (
    <UnstyledButton
      {...props}
      ref={ref}
      className={clsx(
        'ui-Button',
        `--${height}`,
        `--${variant}`,
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
export default Button
Button.displayName = 'UIButton'
