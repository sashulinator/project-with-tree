import { useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'

import Field, { FieldProps } from '~/abstract/field/ui/field'
import { MentionsItem } from '~/entities/rule/ui/editor/widgets/rules/widgets/item/widgets/input/ui/input'

import defaultMentionStyle from './defaultMentionStyle'
import defaultStyle from './defaultStyle'

interface Props extends FieldProps {
  data: MentionsItem[]
}

export default function Mentions({ data, ...props }: Props): JSX.Element {
  const onAdd = (e: string | number): void => {
    console.dir(e)
  }
  const [value, setValue] = useState<string>('')

  return (
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    <Field {...props}>
      <MentionsInput
        value={value}
        onChange={(_, v): void => {
          console.log(v)
          setValue(v)
        }}
        style={defaultStyle}
      >
        <Mention onAdd={onAdd} trigger='@' data={data} style={defaultMentionStyle} />
      </MentionsInput>
    </Field>
  )
}
