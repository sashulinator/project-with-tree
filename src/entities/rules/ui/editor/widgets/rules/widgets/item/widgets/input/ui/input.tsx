import './input.css'

import { useRef } from 'react'
import { Mention } from 'react-mentions'
import { useRecoilState, useRecoilValue } from 'recoil'

import { onChangeTextarea } from '~/entities/rules/lib/on-change-textarea'
import { onDropTextarea } from '~/entities/rules/lib/on-drop-textarea'
import { dragOverButtonsIdAtom } from '~/entities/rules/models/drag-over-buttons-id'
import { dragOverItemIdAtom } from '~/entities/rules/models/drag-over-item-id'
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
  const [_, setEditorValues] = useRecoilState(editorRulesValuesAtom)
  const [draggableItem, setDraggableItem] = useRecoilState(draggableItemAtom)
  const [dragOverItemId, setDragOverId] = useRecoilState(dragOverItemIdAtom)
  const [dragOverButtonsId, setDragOverButtonsId] = useRecoilState(dragOverButtonsIdAtom)

  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div
      draggable
      style={{ boxShadow: dragOverItemId === id ? '10px 5px 5px black' : '' }}
      className={Input.displayName}
      onDragOver={dragOver}
      onDrop={drop}
      onDragStart={dragStart}
    >
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

  function drop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    if (draggableCard) {
      setEditorValues((arr) => onDropTextarea(arr, draggableCard, id))
      setDraggableCard(null)
      inputRef.current?.focus()
    }
  }

  function dragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    e.stopPropagation()
    if (draggableItem && id !== draggableItem.id) {
      if (dragOverButtonsId) setDragOverButtonsId(null)
      if (dragOverItemId !== id) {
        setDragOverId(id)
      }
    } else {
      setDragOverId(null)
    }
  }

  function dragStart(): void {
    if (draggableCard) {
      setDraggableCard(null)
    }
    setDraggableItem({ value: value, id: id, parentId: parentId })
  }
}
