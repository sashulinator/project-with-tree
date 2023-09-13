import './input.scss'

import { MentionsInputProps as IMentionsInputProps, MentionsInput as RMMentionsInput } from 'react-mentions'

import Field from '~/abstract/field/ui/field'
import { FieldProps } from '~/ui/field'
import { c } from '~/utils/core'
import { fns } from '~/utils/function'
import { useBoolean } from '~/utils/hooks'

import style from './style'

Input.displayName = 'ui-Mentions-w-Input'

export interface Props extends IMentionsInputProps {
  fieldProps?: FieldProps
  isError?: boolean | undefined
  transparent?: boolean | undefined
}

export default function Input(props: Props): JSX.Element {
  const { fieldProps, isError, transparent, className, ...mentionInputProps } = props

  const [isFocused, focus, blur] = useBoolean(false)

  return (
    <Field
      transparent={transparent}
      isError={isError}
      isFocused={isFocused}
      disabled={mentionInputProps.disabled}
      {...fieldProps}
      className={c(className, Input.displayName)}
      height={null}
    >
      <RMMentionsInput
        {...mentionInputProps}
        onFocus={fns(props.onFocus, focus)}
        onBlur={fns(props.onBlur, blur)}
        className={c('input')}
        style={style}
      />
    </Field>
  )
}
