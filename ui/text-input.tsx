import './text-input.scss'

import c from 'clsx'
import { forwardRef } from 'react'

import { useBoolean } from '~/utils/hooks/boolean'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
  root?: React.HTMLAttributes<HTMLDivElement>
  isError?: boolean
  left?: React.ReactNode
  right?: React.ReactNode
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(props, ref): JSX.Element {
  const [isFocused, setFocused, unsetFocused] = useBoolean(false)

  return (
    <div
      {...props.root}
      className={c(
        props.root?.className,
        'TextInput',
        isFocused && '--isFocused',
        props.disabled && '--disabled',
        props.isError && '--error',
        props.readOnly && '--readOnly'
      )}
    >
      {props?.left}
      <input {...props} ref={ref} onFocus={handleOnFocus} onBlur={handleOnBlur} />
      {props?.right}
    </div>
  )

  // Private

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    console.log('allo')
    setFocused()
    props.onFocus?.(e)
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    unsetFocused()
    props.onBlur?.(e)
  }
})

export default TextInput
