import './rules.css'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import Flex from '~/abstract/flex'
import { onDropItemToCanvas } from '~/entities/rules/lib/on-drop-item-to-canvas'
import { onDropItemToItem } from '~/entities/rules/lib/on-drop-item-to-item'
import { directionAtom } from '~/entities/rules/models/direction'
import { dragOverButtonsIdAtom } from '~/entities/rules/models/drag-over-buttons-id'
import { dragOverHeaderAtom } from '~/entities/rules/models/drag-over-header'
import { dragOverItemHeaderIdAtom } from '~/entities/rules/models/drag-over-item-header-id'
import { dragOverItemIdAtom } from '~/entities/rules/models/drag-over-item-id'
import { draggableItemAtom } from '~/entities/rules/models/draggableItem'
import { EditorValues, SelectValue, editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
import { RulesRes } from '~/entities/rules/types/rules-type'
import { emitter } from '~/shared/emitter'
import { GhostButton } from '~/ui/button'
import { ArrowLeft, ArrowRight } from '~/ui/icon'
import { Save } from '~/ui/icon/variants/save'
import Input from '~/ui/input'
import { c } from '~/utils/core'

import { themes } from '../themes'
import { Item } from '../widgets/item'
import AddDeleteButtons from '../widgets/item/widgets/add-delete-buttons/ui/add-delete-buttons'
import SplitBtn from '../widgets/item/widgets/split-btn'

Rules.displayName = 'ruleEditor-w-Rules'

emitter.emit('addTheme', themes)

interface RulesProps {
  onSubmit: (editorValue: EditorValues[], title: string) => void
  rule: RulesRes | null
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Rules(props: RulesProps): JSX.Element {
  const { onSubmit, rule } = props

  const [editorValue, setEditorValues] = useRecoilState(editorRulesValuesAtom)
  const [draggableItem, setDraggableItem] = useRecoilState(draggableItemAtom)
  const [dragOverItemId, setDragOverId] = useRecoilState(dragOverItemIdAtom)
  const [dragOverButtonsId, setDragOverButtonsId] = useRecoilState(dragOverButtonsIdAtom)
  const direction = useRecoilValue(directionAtom)
  const [overHeader, setOverHeader] = useRecoilState(dragOverHeaderAtom)
  const [overHeaderItemId, setOverHeaderItemId] = useRecoilState(dragOverItemHeaderIdAtom)

  const [title, setTitle] = useState('')

  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    setLoading(false)
    try {
      if (rule?.editor && rule?.name && rule?.keyName) {
        setEditorValues(JSON.parse(rule.editor) as EditorValues[])
        setTitle(`${rule.name} (${rule.keyName})`)
      } else {
        setEditorValues([
          {
            id: '5',
            valueArr: [{ id: '3', value: '', condition: SelectValue.and }],
            condition: SelectValue.and,
          },
        ])
      }
      setLoading(true)
    } catch {
      setEditorValues([
        {
          id: '5',
          valueArr: [{ id: '3', value: '', condition: SelectValue.and }],
          condition: SelectValue.and,
        },
      ])
    }
  }, [rule?.editor])

  const versionNum = useRef(0)
  const memoryRulesValues = useRef([editorValue])
  const flag = useRef(false)

  useEffect(() => {
    if (flag.current) {
      flag.current = false
      return
    }
    if (versionNum.current !== memoryRulesValues.current.length - 1) {
      memoryRulesValues.current = memoryRulesValues.current.splice(0, versionNum.current)
    }

    if (memoryRulesValues.current.length < 50) {
      memoryRulesValues.current.push(editorValue)
    } else {
      memoryRulesValues.current.shift()
      memoryRulesValues.current.push(editorValue)
    }

    versionNum.current = memoryRulesValues.current.length - 1
  }, [editorValue])

  return (
    <>
      {loading && (
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
            <Flex style={{ width: '100%' }} dir='column'>
              <Input
                value={title}
                onChange={(e): void => setTitle(e.target.value)}
                style={{ paddingTop: '20px', textAlign: 'center' }}
                height={'l'}
                placeholder='Заголовок правила (id правила)'
              />
            </Flex>
            <Flex mainAxis='end' gap='xl'>
              <GhostButton height={'l'} padding={'s'} onClick={onSubmitFun}>
                <Save width={'30px'} height={'30px'} />
              </GhostButton>
            </Flex>
          </Flex>

          {editorValue.map((item, i) => {
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
                  <Item condition={item.condition} id={item.id} values={item.valueArr} />
                </div>
                <AddDeleteButtons
                  condition={item.condition}
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
      )}
      {!loading && <div>Загрузка</div>}
    </>
  )

  // Private
  function onSubmitFun(): void {
    onSubmit(editorValue, title)
  }

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
      setEditorValues(onDropItemToCanvas(editorValue, draggableItem))
      setDraggableItem(null)
    }

    if (parentId && dragOverButtonsId && draggableItem) {
      setEditorValues(onDropItemToCanvas(editorValue, draggableItem, dragOverButtonsId))
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
      setEditorValues(onDropItemToCanvas(editorValue, draggableItem, null, 'up'))
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
      setEditorValues(memoryRulesValues.current[versionNum.current - 1])
      versionNum.current -= 1
    }
  }

  function forth(): void {
    flag.current = true

    if (versionNum.current <= memoryRulesValues.current.length - 2) {
      setEditorValues(memoryRulesValues.current[versionNum.current + 1])
      versionNum.current += 1
    }
  }
}
