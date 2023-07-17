import { useState } from 'react'
import { MentionsInput, Mention } from 'react-mentions'
import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'
import { IMentionsItem } from './types/types'

interface Props {
  data: IMentionsItem[]
}

export default function Mentions({ data }: Props): JSX.Element {
  const onAdd = (e: string | number): void => {
    console.dir(e)
  }
  const [value, setValue] = useState<string>('')

  return (
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
  )
}
