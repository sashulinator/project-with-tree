import MentionsInput from '~/ui/mention-input'

import { Mention } from 'react-mentions'
import { useRecoilState, useRecoilValue } from 'recoil'
import { draggableCardAtom, editorRulesValuesAtom, mentionsDataAtom } from '~/entities/rules/state/state'
import DropBoard from '~/abstract/drop-board/ui/drop-board'

export interface MentionsItem {
  display: string
  id: string
}

interface EditorInputProps {
  value: string
  id: number
}

export function EditorInput(props: EditorInputProps): JSX.Element {
  const { value, id } = props

  const mentionsData = useRecoilValue(mentionsDataAtom)
  const [draggableCard, setDraggableCard] = useRecoilState(draggableCardAtom)
  const [editorRulesValues, setEditorRulesValues] = useRecoilState(editorRulesValuesAtom)

  // TODO ??? Создать e-Domain-ui-Mentions ???
  return (
    <DropBoard drop={drop}>
      <MentionsInput value={value} onChange={handleChangeMention}>
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

  // Private

  function drop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    if (draggableCard) {
      setEditorRulesValues(
        editorRulesValues.map((item) => {
          if (item.id === id) {
            return { value: `${item.value}@[${draggableCard.name}](${draggableCard.id})`, id: id }
          }
          return item
        })
      )
      setDraggableCard(null)
    }
  }

  function handleChangeMention(_: unknown, v: string): void {
    setEditorRulesValues(
      editorRulesValues.map((item) => {
        if (item.id === id) {
          return { value: v, id: id }
        }
        return item
      })
    )
  }
}
