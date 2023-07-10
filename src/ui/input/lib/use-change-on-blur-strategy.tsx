import { ForwardedRef, useEffect, useRef, useState } from 'react'

import { Any } from '~/utils/core'
import { keyListener } from '~/utils/dom/key-listener'
import { fns } from '~/utils/function'
import { useForceUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'
import { InputProps } from '../ui/input'

export type EditableProps = Omit<InputProps, 'onChange'> & {
  onChange?: (ev: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => void
  blurOnSubmit?: boolean | undefined
  cannotBeEmpty?: boolean | undefined
  ref?: ForwardedRef<HTMLInputElement>
}

/**
 * Хук позволяющий вызывает функцию onChange при событии onBlur и при нажатии Enter
 * @example
 *  <Input
 *    {...useChangeOnBlurStrategy({
 *      transparent: true,
 *      cannotBeEmpty: true,
 *      value,
 *      onChange,
 *    })}
 *  />
 */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useChangeOnBlurStrategy(props: EditableProps) {
  const { onChange, blurOnSubmit, cannotBeEmpty, ...inputProps } = props

  const update = useForceUpdate()

  const inputRef = useRef<HTMLInputElement>(null)

  const initialValueRef = useRef(props.value)
  const [value, setValue] = useState(props.value)

  useEffect(syncValues, [props.value, initialValueRef.current])

  return {
    ...inputProps,
    value,
    ref: setRefs(props.ref, inputRef),
    onBlur: fns(handleChange, props.onBlur),
    onChange: (e: React.ChangeEvent<HTMLInputElement>): void => setValue(e.target.value),
    onKeyDown: fns(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      keyListener('Enter', handleChange as Any),
      keyListener('Escape', fns(reset, blur)),
      props.onKeyDown
    ),
  }

  // Private

  function handleChange(ev: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>): void {
    if (!ev.currentTarget.value.trim()) {
      if (cannotBeEmpty) {
        reset()
      }
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
    inputRef.current?.blur()
  }
}
