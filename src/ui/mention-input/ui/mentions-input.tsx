import Field from '~/abstract/field/ui/field'
import { MentionsInput as RMMentionsInput, MentionsInputProps as IMentionsInputProps } from 'react-mentions'
import style from './style'
import './mentions-input.css'

import { FieldProps } from '~/ui/field'
import { fns } from '~/utils/function'

import { useBoolean } from '~/utils/hooks'
import { c } from '~/utils/core'

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
