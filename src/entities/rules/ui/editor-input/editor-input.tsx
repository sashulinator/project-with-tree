import MentionsInput from '~/ui/mention-input'

import { Mention } from 'react-mentions'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { draggableCardAtom, editorRulesValuesAtom, mentionsDataAtom } from '~/entities/rules/state/state'
import DropBoard from '~/abstract/drop-board/ui/drop-board'
import { onDropTextarea } from '../../lib'
import { onChangeTextarea } from '../../lib/on-change-textarea'

export interface MentionsItem {
  display: string
  id: string
}

interface EditorInputProps {
  value: string
  id: string
}

export function EditorInput(props: EditorInputProps): JSX.Element {
  const { value, id } = props

  const mentionsData = useRecoilValue(mentionsDataAtom)
  const [draggableCard, setDraggableCard] = useRecoilState(draggableCardAtom)
  const setEditorRulesValues = useSetRecoilState(editorRulesValuesAtom)

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
      setEditorRulesValues((arr) => onDropTextarea(arr, draggableCard, id))
      setDraggableCard(null)
    }
  }

  function handleChangeMention(_: unknown, v: string): void {
    setEditorRulesValues((arr) => onChangeTextarea(arr, id, v))
  }
}
