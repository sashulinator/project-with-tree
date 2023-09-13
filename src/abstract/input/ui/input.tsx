import './input.css'

import { ForwardedRef, createElement, forwardRef } from 'react'

import { c } from '~/utils/core'
import { fns } from '~/utils/function'
import { useBoolean } from '~/utils/hooks'

InputComponent.displayName = 'a-Input'

export type InputProps<TFieldProps extends object> = React.InputHTMLAttributes<HTMLInputElement> & {
  left?: React.ReactNode
  right?: React.ReactNode
  fieldProps: TFieldProps
  renderField: (props: TFieldProps) => JSX.Element
}

/**
 * Компонент Input
 *
 * Предполагает что сам по себе он использован не будет,
 * но будет вложен в компонент `Field`,
 * который принимает через пропс `renderField`
 *
 * Фичи:
 * 1. Передает компоненту Field пропс isFocused
 * 2. Отрисовывает слева/справа от инпута елемент
 */
function InputComponent<TFieldProps extends object>(
  props: InputProps<TFieldProps>,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const { left, right, className, fieldProps, renderField, ...inputProps } = props

  const [isFocused, setFocused, unsetFocused] = useBoolean(false)

  const children = (
    <>
      {left}
      <input
        {...inputProps}
        ref={ref}
        className={c(className, InputComponent.displayName)}
        onFocus={fns(props.onFocus, setFocused)}
        onBlur={fns(props.onBlur, unsetFocused)}
      />
      {right}
    </>
  )

  // eslint-disable-next-line react/no-children-prop
  return <>{createElement(renderField, { ...fieldProps, isFocused, children })}</>
}

// Генерик схлопывается при использовании forwardRef
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const Input = forwardRef(InputComponent) as <TFieldProps extends object>(
  props: InputProps<TFieldProps> & { ref?: ForwardedRef<HTMLInputElement> }
) => JSX.Element
export default Input
