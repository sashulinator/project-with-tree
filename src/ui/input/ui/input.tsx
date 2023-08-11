import './input.css'

import { ForwardedRef, forwardRef } from 'react'

import AbstractInput from '~/abstract/input'
import Field, { FieldProps } from '~/ui/field'
import { c } from '~/utils/core'

InputComponent.displayName = 'ui-Input'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  height?: 'm' | 's' | 'l'
  left?: React.ReactNode
  right?: React.ReactNode
  isError?: boolean
  transparent?: boolean
  fieldProps?: FieldProps
}

function InputComponent(props: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { left, right, className, fieldProps, height = 'm', transparent, isError, ...inputProps } = props

  return (
    <AbstractInput
      {...inputProps}
      className={c('input')}
      ref={ref}
      left={left}
      right={right}
      renderField={Field}
      fieldProps={{
        height,
        isError,
        transparent,
        ...fieldProps,
        className: c(fieldProps?.className, className, InputComponent.displayName),
      }}
    />
  )
}

const Input = forwardRef(InputComponent)
export default Input
