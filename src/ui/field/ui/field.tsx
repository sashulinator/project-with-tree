import './field.css'

import AbstractField, { FieldProps as AbstractFieldProps } from '~/abstract/field'
import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

Field.displayName = 'ui-Field'

export interface FieldProps extends Omit<AbstractFieldProps, 'height'> {
  height?: 'm' | 's' | 'l' | null
}

export default function Field(props: FieldProps): JSX.Element {
  const { height = 'm', ...fieldProps } = props

  return <AbstractField height={height} {...fieldProps} className={c(props.className, Field.displayName)} />
}
