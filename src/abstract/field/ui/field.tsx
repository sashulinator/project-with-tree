import './field.css'

import { clsx } from 'clsx'

Field.displayName = 'a-Field'

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: 's' | 'm' | 'l' | null | undefined
  readOnly?: boolean | undefined
  disabled?: boolean | undefined
  isError?: boolean | undefined
  isFocused?: boolean | undefined
}

export default function Field(props: FieldProps): JSX.Element {
  const { height, readOnly, isFocused, isError, disabled, ...divProps } = props

  return (
    <div
      {...divProps}
      className={clsx(
        props.className,
        Field.displayName,
        isFocused && '--focused',
        isError && '--error',
        disabled && '--disabled',
        readOnly && '--readonly',
        height && `--${height}`
      )}
    >
      {props.children}
    </div>
  )
}
