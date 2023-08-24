import './field.css'

import { c } from '~/utils/core'

Field.displayName = 'a-Field'

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: 's' | 'm' | 'l' | null | undefined
  readOnly?: boolean | undefined
  disabled?: boolean | undefined
  isError?: boolean | undefined
  isFocused?: boolean | undefined
  hidden?: boolean | undefined
  transparent?: boolean | undefined
}

export default function Field(props: FieldProps): JSX.Element {
  const { height, readOnly, isFocused, isError, disabled, transparent, hidden, ...divProps } = props

  return (
    <div
      {...divProps}
      aria-hidden={hidden}
      className={c(
        props.className,
        Field.displayName,
        isFocused && '--focused',
        isError && '--error',
        disabled && '--disabled',
        readOnly && '--readonly',
        hidden && `--hidden`,
        transparent && '--transparent',
        height && `--${height}`
      )}
    >
      {props.children}
    </div>
  )
}
