import './text-input.css'

import c from 'clsx'
import { forwardRef } from 'react'

import { useBoolean } from '~/utils/hooks/boolean'

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  isError?: boolean
  left?: React.ReactNode
  right?: React.ReactNode
  height?: 's' | 'l' | 'm'
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(props, ref): JSX.Element {
  const [isFocused, setFocused, unsetFocused] = useBoolean(false)
  const { rootProps, isError, left, right, height = 'm', ...restProps } = props

  return (
    <div
      {...rootProps}
      className={c(
        'TextInput',
        isFocused && '--focused',
        isError && '--error',
        props.disabled && '--disabled',
        props.readOnly && '--readonly',
        `--${height}`,
        rootProps?.className
      )}
    >
      {left}
      <input {...restProps} ref={ref} onFocus={handleOnFocus} onBlur={handleOnBlur} />
      {right}
    </div>
  )

  // Private

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    setFocused()
    props.onFocus?.(e)
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    unsetFocused()
    props.onBlur?.(e)
  }
})

TextInput.displayName = 'TextInput'
export default TextInput
