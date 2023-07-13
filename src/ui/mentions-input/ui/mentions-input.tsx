import { useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'
import defaultStyle from './defaultStyle'
import defaultMentionStyle from './defaultMentionStyle'

export default function MenInput(): JSX.Element {
  const [valueState, setValueState] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    setValueState(e.target.value)
  }

  const test = [
    { id: 1, display: 'Вика' },
    { id: 2, display: 'Вася' },
    { id: 3, display: 'Даша' },
  ]

  return (
    <MentionsInput style={defaultStyle} value={valueState} onChange={handleChange}>
      <Mention style={defaultMentionStyle} trigger='@' data={test} />
    </MentionsInput>
  )
}
