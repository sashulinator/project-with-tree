import './labeled.scss'

import { cloneElement, isValidElement, useMemo } from 'react'

import { Dictionary, c, generateId } from '~/utils/core'

Labeled.displayName = 'ui-Labeled'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  htmlFor?: string
  direction?: 'horizontal' | 'vertical'
  hidden?: boolean | undefined
  labelProps?: React.HTMLAttributes<HTMLLabelElement>
  children: React.ReactNode
}

export default function Labeled(props: Props): JSX.Element {
  const { label, htmlFor, direction = 'vertical', children, className, labelProps, hidden, ...divProps } = props

  const id = useMemo(() => htmlFor || generateId(), [htmlFor])

  return (
    <div
      {...divProps}
      aria-hidden={hidden}
      className={c(className, Labeled.displayName, `--${direction}`, hidden && `--hidden`)}
    >
      <label className='label' {...labelProps} htmlFor={id}>
        {label}
      </label>
      {isValidElement(children) ? cloneElement(children, { id } as Dictionary) : children}
    </div>
  )
}
