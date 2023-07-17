import { useState } from 'react'
import { MentionsInput, Mention } from 'react-mentions'
import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'
import { IMentionsItem } from '../types/types'
import Field, { FieldProps } from '~/abstract/field/ui/field'
import './mentions.css'
import { useControlledState } from '~/utils/hooks/controlled-state'
interface Props extends FieldProps {
  data: IMentionsItem[]
  defaultFocus?: boolean | undefined
  onExpandedChange: (value: boolean) => void
}

export default function Mentions({ data, ...props }: Props): JSX.Element {
  const onAdd = (e: string | number): void => {
    console.dir(e)
  }
  const [value, setValue] = useState<string>('')
  const { isFocused, disabled, onExpandedChange, defaultFocus } = props

  const [focus, setFocus] = useControlledState<boolean>(!!defaultFocus, isFocused, onExpandedChange)

  return (
    <Field {...props}>
      <MentionsInput
        disabled={!!disabled}
        onFocus={toggleFocused}
        onBlur={toggleBlur}
        value={value}
        onChange={(_, v): void => {
          console.log(v)
          setValue(v)
        }}
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
