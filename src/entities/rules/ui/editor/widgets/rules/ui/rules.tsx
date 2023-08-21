import './rules.css'

import { animated, useSpring } from '@react-spring/web'

import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import Flex from '~/abstract/flex'
import { onDropItemToCanvas } from '~/entities/rules/lib/on-drop-item-to-canvas'
import { onDropItemToItem } from '~/entities/rules/lib/on-drop-item-to-item'
import { directionAtom } from '~/entities/rules/models/direction'
import { dragOverButtonsIdAtom } from '~/entities/rules/models/drag-over-buttons-id'
import { dragOverHeaderAtom } from '~/entities/rules/models/drag-over-header'
import { dragOverItemHeaderIdAtom } from '~/entities/rules/models/drag-over-item-header-id'
import { dragOverItemIdAtom } from '~/entities/rules/models/drag-over-item-id'
import { draggableItemAtom } from '~/entities/rules/models/draggableItem'
import { editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
import { emitter } from '~/shared/emitter'
import { AppearFrom } from '~/ui/animation'
import { GhostButton } from '~/ui/button'
import { H1 } from '~/ui/heading'
import { ArrowLeft, ArrowRight } from '~/ui/icon'
import { Save } from '~/ui/icon/variants/save'
import { c } from '~/utils/core'

import { themes } from '../themes'
import { Item } from '../widgets/item'
import AddDeleteButtons from '../widgets/item/widgets/add-delete-buttons/ui/add-delete-buttons'
import SplitBtn from '../widgets/item/widgets/split-btn'

Rules.displayName = 'ruleEditor-w-Rules'

emitter.emit('addTheme', themes)

export function Rules(): JSX.Element {
  const [editorRulesValues, setEditorVales] = useRecoilState(editorRulesValuesAtom)
  const versionNum = useRef(0)
  const memoryRulesValues = useRef([editorRulesValues])
  const flag = useRef(false)

  const [draggableItem, setDraggableItem] = useRecoilState(draggableItemAtom)
  const [dragOverItemId, setDragOverId] = useRecoilState(dragOverItemIdAtom)
  const [dragOverButtonsId, setDragOverButtonsId] = useRecoilState(dragOverButtonsIdAtom)
  const [editorValue, setEditorValues] = useRecoilState(editorRulesValuesAtom)
  const [direction, setDirection] = useRecoilState(directionAtom)
  const [overHeader, setOverHeader] = useRecoilState(dragOverHeaderAtom)
  const [overHeaderItemId, setOverHeaderItemId] = useRecoilState(dragOverItemHeaderIdAtom)

  useEffect(() => {
    if (flag.current) {
      flag.current = false
      return
    }
    if (versionNum.current !== memoryRulesValues.current.length - 1) {
      memoryRulesValues.current = memoryRulesValues.current.splice(0, versionNum.current)
    }

    if (memoryRulesValues.current.length < 50) {
      memoryRulesValues.current.push(editorRulesValues)
    } else {
      memoryRulesValues.current.shift()
      memoryRulesValues.current.push(editorRulesValues)
    }

    versionNum.current = memoryRulesValues.current.length - 1
  }, [editorRulesValues])

  return (
    <ul className={c(Rules.displayName)} onDragOver={dragOver} onDrop={dropToBoard} id='ruleEditor-w-Rules'>
      <Flex
        onDrop={dropToBoardUp}
        onDragOver={dragOverHeader}
        onDragLeave={(e): void => {
          e.preventDefault()
          e.stopPropagation()
          if (overHeader) setOverHeader(false)
        }}
        className={c('header', overHeader && '--dragOver')}
        gap='xl'
        mainAxis='space-between'
        crossAxis='center'
      >
        <Flex gap='xl'>
          <GhostButton height={'l'} padding={'s'} onClick={back}>
            <ArrowLeft width={'30px'} height={'30px'} />
          </GhostButton>
          <GhostButton height={'l'} padding={'s'} onClick={forth}>
            <ArrowRight width={'30px'} height={'30px'} />
          </GhostButton>
        </Flex>

        <H1 style={{ marginBottom: 0 }}>Заголовок правила(id правила)</H1>
        <Flex mainAxis='end' gap='xl'>
          <GhostButton height={'l'} padding={'s'}>
            <Save width={'30px'} height={'30px'} />
          </GhostButton>
        </Flex>
      </Flex>

      {editorRulesValues.map((item, i) => {
        return (
          <li onDrop={(_): void => dropItemToItem(_, item.id)} onDragOver={dragOver} key={item.id} className='list'>
            <div className='item'>
              <div
                className={c('header-item', overHeaderItemId === item.id && '--dragOver')}
                style={{
                  minHeight: item.valueArr.length > 1 ? '70px' : '20px',
                }}
                onDrop={(_): void => dropItemToHeaderItem(_, item.id)}
                onDragOver={(e): void => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (overHeaderItemId !== item.id) {
                    setOverHeaderItemId(item.id)
                  }
                  if (dragOverItemId) setDragOverId(null)
                  if (dragOverButtonsId) setDragOverButtonsId(null)
                }}
              >
                {item.valueArr.length > 1 && (
                  <SplitBtn
                    rootProps={{
                      style: { marginLeft: 'auto' },
                    }}
                    index={i}
                  />
                )}
              </div>
              <Item id={item.id} values={item.valueArr} />
            </div>
            <AddDeleteButtons
              isDragOver={item.id === dragOverButtonsId}
              rootProps={{
                onDrop: (_) => dropToBoard(_, item.id),
                onDragOver: (_) => dragOver(_, item.id),
                id: 'ruleEditor-w-Rules',
              }}
              itemId={item.id}
              parentId={item.id}
            />
          </li>
        )
      })}
    </ul>
  )

  // Private
  function dragOver(e: React.DragEvent<HTMLElement>, parentId: string | null = null): void {
    e.preventDefault()
    e.stopPropagation()

    const reg = new RegExp(AddDeleteButtons.displayName)
    if (overHeaderItemId) {
      setOverHeaderItemId(null)
    }

    if (reg.test((e.target as HTMLElement).className) && draggableItem) {
      if (dragOverItemId) setDragOverId(null)
      if (parentId !== dragOverButtonsId) {
        setDragOverButtonsId(parentId)
      }
    }
  }

  function dragOverHeader(e: React.DragEvent<HTMLElement>): void {
    e.preventDefault()
    e.stopPropagation()
    if (overHeaderItemId) {
      setOverHeaderItemId(null)
    }
    if (!overHeader) setOverHeader(true)
  }

  function dropToBoard(e: React.DragEvent<HTMLElement>, parentId: string | null = null): void {
    e.preventDefault()
    e.stopPropagation()
    if (overHeaderItemId) {
      setOverHeaderItemId(null)
    }
    if ((e.target as HTMLElement).id === 'ruleEditor-w-Rules' && draggableItem) {
      setEditorVales(onDropItemToCanvas(editorRulesValues, draggableItem))
      setDraggableItem(null)
    }

    if (parentId && dragOverButtonsId && draggableItem) {
      setEditorVales(onDropItemToCanvas(editorRulesValues, draggableItem, dragOverButtonsId))
      setDraggableItem(null)
    }
    if (dragOverItemId) setDragOverId(null)
    if (dragOverButtonsId) setDragOverButtonsId(null)
    if (draggableItem) setDraggableItem(null)
    if (overHeader) setOverHeader(false)
  }

  function dropToBoardUp(e: React.DragEvent<HTMLElement>): void {
    e.preventDefault()
    e.stopPropagation()
    if (draggableItem) {
      setEditorVales(onDropItemToCanvas(editorRulesValues, draggableItem, null, 'up'))
      setDraggableItem(null)
    }
    if (overHeaderItemId) {
      setOverHeaderItemId(null)
    }
    if (dragOverItemId) setDragOverId(null)
    if (dragOverButtonsId) setDragOverButtonsId(null)
    if (draggableItem) setDraggableItem(null)
    if (overHeader) setOverHeader(false)
  }

  function dropItemToItem(e: React.DragEvent<HTMLElement>, id: string): void {
    e.preventDefault()
    e.stopPropagation()

    if (draggableItem && id !== draggableItem.id && dragOverItemId) {
      setEditorValues(onDropItemToItem(editorValue, id, dragOverItemId, draggableItem, direction))
      setDraggableItem(null)
    }
    if (overHeaderItemId) {
      setOverHeaderItemId(null)
    }

    if (dragOverItemId) setDragOverId(null)
    if (dragOverButtonsId) setDragOverButtonsId(null)
    if (draggableItem) setDraggableItem(null)
    if (overHeader) setOverHeader(false)
  }

  function dropItemToHeaderItem(e: React.DragEvent<HTMLElement>, id: string): void {
    e.preventDefault()
    e.stopPropagation()
    if (draggableItem) {
      const result = editorValue
        .map((arr) => {
          if (arr.id === id) {
            return {
              ...arr,
              valueArr: [draggableItem, ...arr.valueArr.filter((item) => item.id !== draggableItem?.id)],
            }
          }
          return { ...arr, valueArr: arr.valueArr.filter((item) => item.id !== draggableItem?.id) }
        })
        .filter((item) => item.valueArr.length)
      setEditorValues(result)
      setDraggableItem(null)
    }

    if (overHeaderItemId) {
      setOverHeaderItemId(null)
    }

    if (dragOverItemId) setDragOverId(null)
    if (dragOverButtonsId) setDragOverButtonsId(null)
    if (draggableItem) setDraggableItem(null)
    if (overHeader) setOverHeader(false)
  }

  function back(): void {
    flag.current = true

    if (versionNum.current >= 2) {
      setEditorVales(memoryRulesValues.current[versionNum.current - 1])
      versionNum.current -= 1
    }
  }

  function forth(): void {
    flag.current = true

    if (versionNum.current <= memoryRulesValues.current.length - 2) {
      setEditorVales(memoryRulesValues.current[versionNum.current + 1])
      versionNum.current += 1
    }
  }
}
