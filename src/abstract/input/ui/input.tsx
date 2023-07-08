import './input.css'

import { clsx } from 'clsx'
import { createElement, ForwardedRef, forwardRef } from 'react'

import { useBoolean } from '~/utils/hooks'
import { fns } from '~/utils/function'

InputComponent.displayName = 'a-Input'

export type InputProps<TFieldProps extends object> = React.InputHTMLAttributes<HTMLInputElement> & {
  left?: React.ReactNode
  right?: React.ReactNode
  fieldProps: TFieldProps
  renderField: (props: TFieldProps) => JSX.Element
}

function InputComponent<TFieldProps extends object>(
  props: InputProps<TFieldProps>,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const { left, right, className, fieldProps, renderField, ...inputProps } = props

  const [isFocused, setFocused, unsetFocused] = useBoolean(false)

  const children = [
    left,
    <input
      key='0'
      {...inputProps}
      ref={ref}
      className={clsx(className, InputComponent.displayName)}
      onFocus={fns(props.onFocus, setFocused)}
      onBlur={fns(props.onBlur, unsetFocused)}
    />,
    right,
  ]

  return <>{createElement(renderField, { ...fieldProps, isFocused, children })}</>
}

// Генерик схлопывается при использовании forwardRef
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const Input = forwardRef(InputComponent) as <TFieldProps extends object>(
  props: InputProps<TFieldProps>,
  ref: ForwardedRef<HTMLInputElement>
) => JSX.Element
export default Input
