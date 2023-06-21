import { ForwardedRef, forwardRef } from 'react'

import AbstractTextInput, { TextInputProps } from '~/abstract/text-input'

export type { TextInputProps }

function TextInputComponent(props: TextInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  return <AbstractTextInput {...props} ref={ref} />
}

const TextInput = forwardRef(TextInputComponent)
export default TextInput
TextInput.displayName = 'UITextInput'
