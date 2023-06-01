import './button.css'

import c from 'clsx'

import { Any } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Dictionary<Any> {
  className?: undefined | string
  height?: 's' | 'm' | 'l'
  variant?: 'outlined' | 'primary'
}

export default function Button(props: ButtonProps): JSX.Element {
  const { height = 'm', variant = 'primary' } = props

  return (
    <button {...props} className={c('ui-Button', `--${height}`, `--${variant}`, props.className)}>
      {props.children}
    </button>
  )
}
