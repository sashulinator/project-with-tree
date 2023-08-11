import './input.css'

import { emitter } from '~/shared/emitter'
import AbstractInput from '~/abstract/input'
import { dark } from '../themes/dark'
import { light } from '../themes/light'

import { ForwardedRef, forwardRef } from 'react'
import Field, { FieldProps } from '~/ui/field'
import { c } from '~/utils/core'

emitter.emit('addTheme', { dark, light })

InputComponent.displayName = 'ui-Input'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  left?: React.ReactNode
  right?: React.ReactNode
  fieldProps?: FieldProps
  height?: 'm' | 's' | 'l'
  isError?: boolean
  transparent?: boolean
}

function InputComponent(props: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { left, right, className, fieldProps, height = 'm', transparent, isError, ...inputProps } = props

  return (
    <AbstractInput
      {...inputProps}
      className={c(InputComponent.displayName)}
      ref={ref}
      left={left}
      right={right}
      renderField={Field}
      fieldProps={{
        height,
        isError,
        transparent,
        ...fieldProps,
        className: c(fieldProps?.className, className, 'ui-Input__field'),
      }}
    />
  )
}

const Input = forwardRef(InputComponent)
export default Input
