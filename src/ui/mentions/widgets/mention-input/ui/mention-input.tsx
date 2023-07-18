import { MentionsInput as RMMentionsInput, MentionsInputProps } from 'react-mentions'
import defaultStyle from './defaultStyle'

import Field from '~/abstract/field/ui/field'
import './mention-input.css'

import { FieldProps } from '~/ui/field'
import { fns } from '~/utils/function'

import { useBoolean } from '~/utils/hooks'
import { c } from '~/utils/core'

MentionInput.displayName = 'ui-Mentions'

export interface MentionsProps extends MentionsInputProps {
  fieldProps?: FieldProps
  isError?: boolean | undefined
  transparent?: boolean | undefined
}

export function MentionInput(props: MentionsProps): JSX.Element {
  const { fieldProps, isError, ...mentionInputProps } = props

  const [isFocused, focus, blur] = useBoolean(false)

  return (
    <Field isError={isError} isFocused={isFocused} disabled={mentionInputProps.disabled} {...fieldProps} height={null}>
      <RMMentionsInput
        {...mentionInputProps}
        onFocus={fns(props.onFocus, focus)}
        onBlur={fns(props.onBlur, blur)}
        style={{ ...defaultStyle }}
        className={c(props.className, MentionInput.displayName)}
      />
    </Field>
  )
}
