import './mentions-input.css'

import { MentionsInputProps as IMentionsInputProps, MentionsInput as RMMentionsInput } from 'react-mentions'

import Field from '~/abstract/field/ui/field'
import { FieldProps } from '~/ui/field'
import { c } from '~/utils/core'
import { fns } from '~/utils/function'
import { useBoolean } from '~/utils/hooks'

import style from './style'

MentionsInput.displayName = 'ui-MentionInput'

export interface MentionsInputProps extends IMentionsInputProps {
  fieldProps?: FieldProps
  isError?: boolean | undefined
  transparent?: string | undefined
}

export default function MentionsInput(props: MentionsInputProps): JSX.Element {
  const { fieldProps, isError, ...mentionInputProps } = props

  const [isFocused, focus, blur] = useBoolean(false)

  return (
    <Field isError={isError} isFocused={isFocused} disabled={mentionInputProps.disabled} {...fieldProps} height={null}>
      <RMMentionsInput
        {...mentionInputProps}
        onFocus={fns(props.onFocus, focus)}
        onBlur={fns(props.onBlur, blur)}
        className={c(props.className, MentionsInput.displayName)}
        style={style}
      />
    </Field>
  )
}
