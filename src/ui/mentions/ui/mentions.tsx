import { useState } from 'react'
import { MentionsInput, Mention } from 'react-mentions'
import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'
import { IMentionsProps } from '../types/types'
import Field from '~/abstract/field/ui/field'
import './mentions.css'
import { useControlledState } from '~/utils/hooks/controlled-state'

export default function Mentions({ data, ...props }: IMentionsProps): JSX.Element {
  const onAdd = (e: string | number): void => {
    console.dir(e)
  }

  const { isFocused, disabled, focusedChange, defaultFocus, value, onChangeValue } = props

  const [focus, setFocus] = useControlledState<boolean>(defaultFocus || false, isFocused, focusedChange)

  return (
    <Field {...props}>
      <MentionsInput
        disabled={!!disabled}
        onFocus={toggleFocused}
        onBlur={toggleBlur}
        value={value}
        onChange={onChangeValue}
        style={defaultStyle}
        className='ui-Mentions'
      >
        <Mention onAdd={onAdd} trigger='@' data={data} style={defaultMentionStyle} />
      </MentionsInput>
    </Field>
  )

  // Private

  function toggleFocused(): void {
    if (!focus) setFocus(true)
  }

  function toggleBlur(): void {
    if (focus) setFocus(false)
  }
}
