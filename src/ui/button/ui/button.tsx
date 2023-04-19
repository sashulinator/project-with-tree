import './button.css'

import c from 'clsx'

import { Any } from '~/utils/core'
import { Dictionary } from '~/utils/dictionary'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, Dictionary<Any> {
  className?: undefined | string
  height?: 's' | 'm' | 'l'
}

export default function Button(props: ButtonProps): JSX.Element {
  const { height = 'm' } = props

  return (
    <button className={c('ui-Button', `--${height}`, props.className)} {...props}>
      {props.children}
    </button>
  )
}
