import MentionsInput from '~/ui/mention-input'

import { Mention } from 'react-mentions'
import { useRecoilState, useRecoilValue } from 'recoil'
import { draggableCardAtom } from '~/entities/rules/state/state'
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

  const [draggableCard, setDraggableCard] = useRecoilState(draggableCardAtom)

  const drop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    if (draggableCard) {
      setValue((arr) =>
        arr.map((item) => {
          if (item.id === id) {
            return { value: `${item.value}@[${draggableCard.name}](${draggableCard.id})`, id: id }
          }
          return item
        })
      )
      setDraggableCard(null)
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
