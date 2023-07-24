import MentionsInput from '~/ui/mention-input'

import { Mention } from 'react-mentions'
import { useRecoilValue } from 'recoil'
import { activeAttributeAtom } from '~/entities/rules/state/state'
import DropBoard from '~/abstract/drop-board/ui/drop-board'

export interface MentionsItem {
  display: string
  id: string
}

interface EditorRulesProps {
  mentionsData: MentionsItem[]
  value: string
  setValue: React.Dispatch<React.SetStateAction<{ id: number; value: string }[]>>
  id: number
}

export default function EditorRules(props: EditorRulesProps): JSX.Element {
  const { mentionsData, value, setValue, id } = props

  const activeAttribute = useRecoilValue(activeAttributeAtom)

  const drop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    if (activeAttribute) {
      setValue((arr) =>
        arr.map((item) => {
          if (item.id === id) {
            return { value: `${item.value}@[${activeAttribute.name}](${activeAttribute.nodeType})`, id: id }
          }
          return item
        })
      )
    }
  }

  // TODO ??? Создать e-Domain-ui-Mentions ???
  return (
    <DropBoard drop={drop}>
      <MentionsInput
        value={value}
        onChange={(_, v): void => {
          setValue((arr) =>
            arr.map((item) => {
              if (item.id === id) {
                return { value: v, id: id }
              }
              return item
            })
          )
        }}
      >
        <Mention
          trigger='@'
          data={mentionsData}
          style={{
            backgroundColor: '#cee4e5',
          }}
        />
      </MentionsInput>
    </DropBoard>
  )
}
