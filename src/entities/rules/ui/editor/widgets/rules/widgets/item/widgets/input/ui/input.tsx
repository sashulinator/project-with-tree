import './input.css'

import { useRef } from 'react'
import { Mention } from 'react-mentions'
import { useRecoilState, useRecoilValue } from 'recoil'

import { onChangeTextarea } from '~/entities/rules/lib/on-change-textarea'
import { onDropItemToItem } from '~/entities/rules/lib/on-drop-item-to-item'
import { onDropTextarea } from '~/entities/rules/lib/on-drop-textarea'
import { draggableCardAtom } from '~/entities/rules/models/draggableCard'
import { draggableItemAtom } from '~/entities/rules/models/draggableItem'
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
  parentId: string
}

Input.displayName = 'Editor-w-Rules-w-Input'

export default function Input(props: EditorInputProps): JSX.Element {
  const { value, id, parentId } = props

  const mentionsData = useRecoilValue(mentionsDataAtom)
  const [draggableCard, setDraggableCard] = useRecoilState(draggableCardAtom)
  const [editorValue, setEditorValues] = useRecoilState(editorRulesValuesAtom)
  const [draggableItem, setDraggableItem] = useRecoilState(draggableItemAtom)

  const inputRef = useRef<HTMLInputElement | null>(null)
  // useEffect(() => console.log(editorValue), [editorValue])
  // TODO ??? Создать e-Domain-ui-Mentions ???
  return (
    <div draggable className={Input.displayName} onDragOver={dragOver} onDrop={drop} onDragStart={dragStart}>
      <div onDrop={(_): void => drop(_, 'up')} className='marker up' />
      <div onDrop={(_): void => drop(_, 'down')} className='marker down' />

      <MentionsInput value={value} onChange={handleChangeMention} inputRef={inputRef}>
        <Mention
          trigger='@'
          data={mentionsData}
          style={{
            backgroundColor: 'var(--mentionItem_bg)',
          }}
        />
      </MentionsInput>
    </div>
  )

  function handleChangeMention(_: unknown, v: string): void {
    setEditorValues((arr) => onChangeTextarea(arr, id, v))
  }

  function drop(e: React.DragEvent<HTMLDivElement>, direction: 'up' | 'down' = 'down'): void {
    e.preventDefault()
    e.stopPropagation()
    if (draggableCard) {
      setEditorValues((arr) => onDropTextarea(arr, draggableCard, id))
      setDraggableCard(null)
      inputRef.current?.focus()
    }
    if (draggableItem && id !== draggableItem.id) {
      setEditorValues(onDropItemToItem(editorValue, parentId, id, draggableItem, direction))
      setDraggableItem(null)
    }
  }

  function dragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    e.stopPropagation()
  }

  function dragStart(): void {
    if (draggableCard) {
      setDraggableCard(null)
    }
    setDraggableItem({ value: value, id: id, parentId: parentId })
  }
}
