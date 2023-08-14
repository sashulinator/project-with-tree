import { useRef } from 'react'
import { Mention } from 'react-mentions'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import DropBoard from '~/abstract/drop-board/ui/drop-board'
import { onChangeTextarea } from '~/entities/rules/lib/on-change-textarea'
import { onDropTextarea } from '~/entities/rules/lib/on-drop-textarea'
import { draggableCardAtom } from '~/entities/rules/models/draggableCard'
import { editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
import { mentionsDataAtom } from '~/entities/rules/models/mentionsData'
import MentionsInput from '~/ui/mention-input'

export interface MentionsItem {
  display: string
  id: string
}

interface EditorInputProps {
  value: string
  id: string
}

export default function Input(props: EditorInputProps): JSX.Element {
  const { value, id } = props

  const mentionsData = useRecoilValue(mentionsDataAtom)
  const [draggableCard, setDraggableCard] = useRecoilState(draggableCardAtom)
  const setEditorValues = useSetRecoilState(editorRulesValuesAtom)

  const inputRef = useRef<HTMLInputElement | null>(null)

  // TODO ??? Создать e-Domain-ui-Mentions ???
  return (
    <DropBoard drop={drop}>
      <MentionsInput value={value} onChange={handleChangeMention} inputRef={inputRef}>
        <Mention
          trigger='@'
          data={mentionsData}
          style={{
            backgroundColor: 'var(--mentionItem_bg)',
          }}
        />
      </MentionsInput>
    </DropBoard>
  )

  // Private
  function drop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    if (draggableCard) {
      setEditorValues((arr) => onDropTextarea(arr, draggableCard, id))
      setDraggableCard(null)
      inputRef.current?.focus()
    }
  }

  function handleChangeMention(_: unknown, v: string): void {
    setEditorValues((arr) => onChangeTextarea(arr, id, v))
  }
}
