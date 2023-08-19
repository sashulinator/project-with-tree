import './rules.css'

import { animated, useSpring } from '@react-spring/web'

import { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'

import Flex from '~/abstract/flex'
import { onDropItemToCanvas } from '~/entities/rules/lib/on-drop-item-to-canvas'
import { onDropItemToItem } from '~/entities/rules/lib/on-drop-item-to-item'
import { dragOverIdAtom } from '~/entities/rules/models/drag-over-id'
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
  const [dragOverId, setDragOverId] = useRecoilState(dragOverIdAtom)
  const [editorValue, setEditorValues] = useRecoilState(editorRulesValuesAtom)
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
      <Flex className='header' gap='xl' mainAxis='space-between' crossAxis='center'>
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
          <li onDrop={(_): void => drop(_, item.id)} onDragOver={dragOver} key={item.id} className='list'>
            <div className='item'>
              {item.valueArr.length > 1 && (
                <SplitBtn index={i} rootProps={{ style: { marginLeft: 'auto', marginBottom: '20px' } }} />
              )}
              <Item id={item.id} values={item.valueArr} />
            </div>
            <AddDeleteButtons
              rootProps={{ onDrop: (_) => dropToBoard(_, item.id), id: 'ruleEditor-w-Rules' }}
              itemId={item.id}
            />
          </li>
        )
      })}
    </ul>
  )

  // Private

  function dropToBoard(e: React.DragEvent<HTMLElement>, parentId: string | null = null): void {
    e.preventDefault()
    e.stopPropagation()
    console.log(2)
    if ((e.target as HTMLElement).id === 'ruleEditor-w-Rules' && draggableItem) {
      setEditorVales(onDropItemToCanvas(editorRulesValues, draggableItem, parentId))
      setDraggableItem(null)
    }
    if (dragOverId) setDragOverId(null)
  }

  function dragOver(e: React.DragEvent<HTMLElement>): void {
    e.preventDefault()
    e.stopPropagation()
  }

  function drop(e: React.DragEvent<HTMLElement>, id: string, direction: 'up' | 'down' = 'down'): void {
    e.preventDefault()
    console.log(e.target)
    if (draggableItem && id !== draggableItem.id && dragOverId) {
      // console.log('----item--------')
      // console.log('parentId', id)
      // console.log('dragOverId', dragOverId)
      // console.log('draggableItem', draggableItem)
      // console.log('direction', direction)
      // console.log('------------------------------------------')

      setEditorValues(onDropItemToItem(editorValue, id, dragOverId, draggableItem, direction))
      setDraggableItem(null)
    }

    if (dragOverId) setDragOverId(null)
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
