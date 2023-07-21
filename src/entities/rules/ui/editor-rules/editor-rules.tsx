import { MentionInput } from '~/ui/mentions'
import { MentionsItem } from '~/ui/mentions/types/types'
import { Mention } from 'react-mentions'
import { useRecoilValue } from 'recoil'
import { activeAttributeAtom } from '~/entities/rules/state/state'
import DropBoard from '~/abstract/drop-board/ui/drop-board'

interface EditorRulesProps {
  mentionsData: MentionsItem[]
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function EditorRules(props: EditorRulesProps): JSX.Element {
  const { mentionsData, value, setValue } = props

  const activeAttribute = useRecoilValue(activeAttributeAtom)

  const drop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    if (activeAttribute) {
      setValue((v) => `${v}@[${activeAttribute.name}](${activeAttribute.nodeType})`)
    }
  }

  return (
    <DropBoard drop={drop}>
      <MentionInput
        value={value}
        onChange={(_, v): void => {
          setValue(v)
        }}
      >
        <Mention
          trigger='@'
          data={mentionsData}
          style={{
            backgroundColor: '#cee4e5',
          }}
        />
      </MentionInput>
    </DropBoard>
  )
}
