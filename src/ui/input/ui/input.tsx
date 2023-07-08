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
}

function InputComponent(props: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element {
  const { left, right, className, fieldProps, height = 'm', ...inputProps } = props

  return (
    <AbstractInput
      {...inputProps}
      className={c(className, InputComponent.displayName)}
      ref={ref}
      left={left}
      right={right}
      renderField={Field}
      fieldProps={{ height, ...fieldProps, className: c(fieldProps?.className, 'ui-Input__field') }}
    />
  )
}

// Генерик схлопывается при использовании forwardRef
// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref
const Input = forwardRef(InputComponent)
export default Input
