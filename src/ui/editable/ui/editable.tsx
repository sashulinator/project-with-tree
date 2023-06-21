import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react'

import TextInput, { TextInputProps } from '~/ui/text-input'
import { Any } from '~/utils/core'
import { keyListener } from '~/utils/dom/key-listener'
import { fns } from '~/utils/function'
import { useForceUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

export type EditableProps = Omit<TextInputProps, 'onChange'> & {
  onChange?: (ev: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => void
  blurOnSubmit?: boolean | undefined
}

function EditableComponent(props: EditableProps, forwardedRef: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { onChange, blurOnSubmit, ...inputProps } = props

  const update = useForceUpdate()

  const ref = useRef<HTMLInputElement>(null)

  const initialValueRef = useRef(props.value)
  const [value, setValue] = useState(props.value)

  useEffect(syncValues, [props.value, initialValueRef.current])

  return (
    <TextInput
      borderless={true}
      transparent={true}
      {...inputProps}
      ref={setRefs(forwardedRef, ref)}
      onBlur={fns(handleChange, props.onBlur)}
      onChange={(e): void => setValue(e.target.value)}
      onKeyDown={fns(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        keyListener('Enter', handleChange as Any),
        keyListener('Escape', fns(reset, blur)),
        props.onKeyDown
      )}
      value={value}
    />
  )

  // Private

  function handleChange(ev: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>): void {
    if (!ev.currentTarget.value) {
      reset()
      return
    }
    onChange?.(ev)
    initialValueRef.current = ev.currentTarget.value
    update()
  }

  function syncValues(): void {
    if (initialValueRef.current === props.value) return
    initialValueRef.current = props.value
    setValue(props.value)
    if (blurOnSubmit) blur()
  }

  function reset(): void {
    setValue(initialValueRef.current)
  }

  function blur(): void {
    ref.current?.blur()
  }
}

const Editable = forwardRef(EditableComponent)
export default Editable
Editable.displayName = 'Editable'
