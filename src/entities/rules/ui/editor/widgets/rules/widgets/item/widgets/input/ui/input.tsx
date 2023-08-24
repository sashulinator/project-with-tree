import './input.css'

import { useRef } from 'react'
import { Mention } from 'react-mentions'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { onChangeTextarea } from '~/entities/rules/lib/on-change-textarea'
import { onDropTextarea } from '~/entities/rules/lib/on-drop-textarea'
import { directionAtom } from '~/entities/rules/models/direction'
import { dragOverButtonsIdAtom } from '~/entities/rules/models/drag-over-buttons-id'
import { dragOverItemIdAtom } from '~/entities/rules/models/drag-over-item-id'
import { draggableCardAtom } from '~/entities/rules/models/draggableCard'
import { draggableItemAtom } from '~/entities/rules/models/draggableItem'
import { SelectValue, editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
import { mentionsDataAtom } from '~/entities/rules/models/mentionsData'
import MentionsInput from '~/ui/mention-input'
import { c } from '~/utils/core'

export interface MentionsItem {
  display: string
  id: string
}

interface EditorInputProps {
  value: string
  id: string
  parentId: string
  condition: SelectValue
}

Input.displayName = 'Editor-w-Rules-w-Input'

export default function Input(props: EditorInputProps): JSX.Element {
  const { value, id, parentId, condition } = props

  const mentionsData = useRecoilValue(mentionsDataAtom)
  const [draggableCard, setDraggableCard] = useRecoilState(draggableCardAtom)
  const setEditorValues = useSetRecoilState(editorRulesValuesAtom)
  const [draggableItem, setDraggableItem] = useRecoilState(draggableItemAtom)
  const [dragOverItemId, setDragOverId] = useRecoilState(dragOverItemIdAtom)
  const [dragOverButtonsId, setDragOverButtonsId] = useRecoilState(dragOverButtonsIdAtom)
  const [direction, setDirection] = useRecoilState(directionAtom)

  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div
      className={c(Input.displayName, draggableItem?.id === id && 'is-draggable')}
      draggable
      onDragOver={dragOver}
      onDrop={drop}
      onDragStart={dragStart}
      onDragEnd={(e): void => {
        e.preventDefault()
        e.stopPropagation()
        if (dragOverItemId) setDragOverId(null)
        if (dragOverButtonsId) setDragOverButtonsId(null)
        if (draggableItem) setDraggableItem(null)
        if (direction !== 'down') setDirection('down')
      }}
      style={{
        boxShadow:
          dragOverItemId === id && direction === 'down'
            ? '0px 30px 8px 0px rgba(0, 0, 0, 0.10)'
            : dragOverItemId === id && direction === 'up'
            ? '0px -30px 8px 0px rgba(0, 0, 0, 0.10)'
            : '',
      }}
    >
      <div
        onDragOver={(_): void => dragOver(_, 'up')}
        style={{
          width: '102.5%',
          position: 'absolute',
          height: '50%',
          background: 'blue',
          top: '-20px',
          left: '-20px',
          opacity: '0',
        }}
      ></div>

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

  function dragOver(e: React.DragEvent<HTMLDivElement>, dir: 'up' | 'down' = 'down'): void {
    e.preventDefault()
    e.stopPropagation()
    if (direction !== dir) setDirection(dir)
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
    setDraggableItem({ value: value, id: id, parentId: parentId, condition: condition })
  }
}
