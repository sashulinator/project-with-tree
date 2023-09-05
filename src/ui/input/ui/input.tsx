import './input.css'

import { ForwardedRef, forwardRef } from 'react'

import AbstractInput from '~/abstract/input'
import Field, { FieldProps } from '~/ui/field'
import { c } from '~/utils/core'

InputComponent.displayName = 'ui-Input'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  height?: 'm' | 's' | 'l'
  width?: string
  left?: React.ReactNode
  right?: React.ReactNode
  isError?: boolean
  transparent?: boolean
  fieldProps?: FieldProps
  inputClassname?: string
}

function InputComponent(props: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const {
    left,
    right,
    className,
    fieldProps,
    height = 'm',
    inputClassname,
    transparent,
    width,
    isError,
    ...inputProps
  } = props

  return (
    <AbstractInput
      {...inputProps}
      className={c(inputClassname, 'input')}
      ref={ref}
      left={left}
      right={right}
      renderField={Field}
      fieldProps={{
        hidden: inputProps.hidden,
        disabled: inputProps.disabled,
        height,
        isError,
        transparent,
        ...fieldProps,
        style: { width, ...props.fieldProps?.style },
        className: c(fieldProps?.className, className, InputComponent.displayName),
      }}
    />
  )
}

const Input = forwardRef(InputComponent)
Input.displayName = InputComponent.displayName
export default Input
