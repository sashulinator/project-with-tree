import { useEffect, useRef, useState } from 'react'
import { Mention } from 'react-mentions'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import DropBoard from '~/abstract/drop-board/ui/drop-board'
import { onChangeTextarea } from '~/entities/rules/lib/on-change-textarea'
import { onDropTextarea } from '~/entities/rules/lib/on-drop-textarea'
import { draggableCardAtom } from '~/entities/rules/models/draggableCard'
import { draggableItemAtom } from '~/entities/rules/models/draggableItem'
import { EditorValues, editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
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
    <div
      draggable
      style={{
        position: 'relative',
        borderRadius: '9px',
        background: 'var(--editorItem_bg)',
        padding: '20px',
        border: '1px solid aqua',
      }}
      onDragOver={dragOver}
      onDrop={drop}
      onDragStart={dragStart}
    >
      {/* <div
        data-direction='up'
        style={{
          position: 'absolute',
          background: '#8DD3D488',
          top: '0',
          left: '0',
          width: '100%',
          height: '50%',
          opacity: 0.5,
        }}
      ></div>
      <div
        data-direction='down'
        style={{
          position: 'absolute',
          background: '#8DD3D488',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '50%',
          opacity: 0.5,
        }}
      ></div> */}
      <div>
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
    </div>
  )

  function handleChangeMention(_: unknown, v: string): void {
    setEditorValues((arr) => onChangeTextarea(arr, id, v))
  }

  function drop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    e.stopPropagation()
    if (draggableCard) {
      setEditorValues((arr) => onDropTextarea(arr, draggableCard, id))
      setDraggableCard(null)
      inputRef.current?.focus()
    }
    if (draggableItem && id !== draggableItem.id) {
      mergeInputs()
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

  function mergeInputs(): void {
    let result: EditorValues[] = []

    result = editorValue
      .map((arr) => {
        if (arr.id === parentId) {
          return {
            ...arr,
            valueArr: arr.valueArr
              .filter((item) => item.id !== draggableItem?.id)
              .map((item) => {
                if (item.id === id && draggableItem) {
                  return [item, { value: draggableItem.value, id: draggableItem.id }]
                }
                return item
              })
              .flat(1),
          }
        }
        return { ...arr, valueArr: arr.valueArr.filter((item) => item.id !== draggableItem?.id) }
      })
      .filter((item) => item.valueArr.length)

    setEditorValues(result)
  }
}
