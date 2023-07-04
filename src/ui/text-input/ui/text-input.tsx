import { ForwardedRef, forwardRef } from 'react'

import AbstractTextInput, { TextInputProps } from '~/abstract/text-input'
import { emitter } from '~/shared/emitter'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

export type { TextInputProps }

function TextInputComponent(props: TextInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  return <AbstractTextInput {...props} ref={ref} />
}

const TextInput = forwardRef(TextInputComponent)
export default TextInput
TextInput.displayName = 'UITextInput'
