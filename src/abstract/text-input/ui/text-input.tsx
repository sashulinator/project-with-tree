import './text-input.css'

import c from 'clsx'
import { forwardRef } from 'react'

import { useBoolean } from '~/utils/hooks/boolean'

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  isError?: boolean
  left?: React.ReactNode
  right?: React.ReactNode
  borderless?: boolean | undefined
  transparent?: boolean | undefined
  height?: 's' | 'l' | 'm'
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(props, ref): JSX.Element {
  const [isFocused, setFocused, unsetFocused] = useBoolean(false)
  // eslint-disable-next-line react/prop-types
  const { rootProps, isError, left, right, height = 'm', borderless, transparent, ...restProps } = props

  return (
    <div
      {...rootProps}
      className={c(
        'TextInput',
        isFocused && '--focused',
        isError && '--error',
        props.disabled && '--disabled',
        props.readOnly && '--readonly',
        borderless && `--borderless`,
        transparent && `--transparent`,
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

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement, Element>): void {
    setFocused()
    props.onFocus?.(e)
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement, Element>): void {
    unsetFocused()
    props.onBlur?.(e)
  }
})

TextInput.displayName = 'TextInput'
export default TextInput
