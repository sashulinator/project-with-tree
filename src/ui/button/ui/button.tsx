import './button.css'

import { clsx } from 'clsx'
import { forwardRef } from 'react'

import UnstyledButton from '~/ui/unstyled-button'
import { Any } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Dictionary<Any> {
  className?: undefined | string
  height?: 's' | 'm' | 'l'
  variant?: 'outlined' | 'primary'
}

function ButtonComponent(props: ButtonProps): JSX.Element {
  const { height = 'm', variant = 'primary' } = props

  return (
    <UnstyledButton {...props} className={clsx('ui-Button', `--${height}`, `--${variant}`, props.className)}>
      {props.children}
    </UnstyledButton>
  )
}

const Button = forwardRef(ButtonComponent)
export default Button
Button.displayName = 'UIButton'
