import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react'

import TextInput, { TextInputProps } from '~/ui/text-input'
import { Any } from '~/utils/core'
import { keyListener } from '~/utils/dom/key-listener'
import { fns } from '~/utils/function'
import { setRefs } from '~/utils/react'

export type EditableProps = Omit<TextInputProps, 'onChange'> & {
  onChange?: (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => void
  blurOnSubmit?: boolean | undefined
}

function EditableComponent(props: EditableProps, forwardedRef: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { onChange, blurOnSubmit, ...inputProps } = props

  const ref = useRef<HTMLInputElement>(null)

  const initialValueRef = useRef(props.value)
  const [value, setValue] = useState(props.value)

  useEffect(syncValues, [props.value])

  return (
    <TextInput
      borderless={true}
      transparent={true}
      {...inputProps}
      ref={setRefs(forwardedRef, ref)}
      onBlur={fns(onChange, props.onBlur)}
      onChange={(e): void => setValue(e.target.value)}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      onKeyDown={fns(keyListener('Enter', onChange as Any), keyListener('Escape', reset), props.onKeyDown)}
      value={value}
    />
  )

  // Private

  function syncValues(): void {
    if (initialValueRef.current === props.value) return
    initialValueRef.current = props.value
    setValue(props.value)
    if (blurOnSubmit) ref.current?.blur()
  }

  function reset(): void {
    setValue(initialValueRef.current)
    ref.current?.blur()
  }
}

const Editable = forwardRef(EditableComponent)
export default Editable
Editable.displayName = 'Editable'
