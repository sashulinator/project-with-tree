import './labeled.scss'

import { c } from '~/utils/core'

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

  return (
    <div
      {...divProps}
      aria-hidden={hidden}
      className={c(className, Labeled.displayName, `--${direction}`, hidden && `--hidden`)}
    >
      <label className='label' {...labelProps} htmlFor={htmlFor}>
        {props.label}
      </label>
      {children}
    </div>
  )
}
