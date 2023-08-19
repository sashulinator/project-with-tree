import './input.css'

import { useMemo, useRef } from 'react'
import { Mention } from 'react-mentions'
import { useRecoilState, useRecoilValue } from 'recoil'

import { onChangeTextarea } from '~/entities/rules/lib/on-change-textarea'
import { onDragEventItemToItem } from '~/entities/rules/lib/on-drag-ever-item-to-item'
import { onDropItemToItem } from '~/entities/rules/lib/on-drop-item-to-item'
import { onDropTextarea } from '~/entities/rules/lib/on-drop-textarea'
import { dragOverIdAtom } from '~/entities/rules/models/drag-over-id'
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
  const [dragOverId, setDragOverId] = useRecoilState(dragOverIdAtom)
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div
      draggable
      style={{ boxShadow: dragOverId === id ? '10px 5px 5px black' : '' }}
      className={Input.displayName}
      onDragOver={dragOver}
      onDrop={drop}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
    >
      {/* <div onDrop={(_): void => drop(_, 'up')} onDragOver={dragOver} className='marker up' />
      <div onDrop={(_): void => drop(_, 'down')} onDragOver={dragOver} className='marker down' /> */}

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
    if (draggableCard) {
      setEditorValues((arr) => onDropTextarea(arr, draggableCard, id))
      setDraggableCard(null)
      inputRef.current?.focus()
    }
    // if (draggableItem && id !== draggableItem.id) {
    //   console.log('----input--------')
    //   console.log('parentId', parentId)
    //   console.log('dragOverId', dragOverId)
    //   console.log('draggableItem', draggableItem)
    //   console.log('direction', direction)
    //   console.log('------------------------------------------')

    //   setEditorValues(onDropItemToItem(editorValue, parentId, dragOverId, draggableItem, direction))
    //   setDraggableItem(null)
    // }

    // if (dragOverId) setDragOverId(null)
  }

  function dragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    e.stopPropagation()
    if (draggableItem && id !== draggableItem.id) {
      if (dragOverId !== id) {
        setDragOverId(id)
      }
    } else {
      setDragOverId(null)
    }
  }

  function dragEnd(e: React.DragEvent<HTMLElement>): void {
    // e.preventDefault()
    // e.stopPropagation()
    // if (dragOverId) setDragOverId(null)
  }

  function dragStart(): void {
    if (draggableCard) {
      setDraggableCard(null)
    }
    setDraggableItem({ value: value, id: id, parentId: parentId })
  }
}
