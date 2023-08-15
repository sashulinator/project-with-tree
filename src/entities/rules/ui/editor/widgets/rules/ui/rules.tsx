import './rules.css'

import { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'

import Flex from '~/abstract/flex'
import { onDropItemToCanvas } from '~/entities/rules/lib/on-drop-item-to-canvas'
import { draggableItemAtom } from '~/entities/rules/models/draggableItem'
import { editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
import { emitter } from '~/shared/emitter'
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
  console.log(editorRulesValues)
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
    <ul className={c(Rules.displayName)} onDragOver={dragOver} onDrop={drop} id='ruleEditor-w-Rules'>
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
          <li key={item.id}>
            <div className='item'>
              {item.valueArr.length > 1 && (
                <SplitBtn index={i} rootProps={{ style: { marginLeft: 'auto', marginBottom: '20px' } }} />
              )}
              <Item id={item.id} values={item.valueArr} />
            </div>
            <AddDeleteButtons id={item.id} />
          </li>
        )
      })}
    </ul>
  )

  // Private

  function drop(e: React.DragEvent<HTMLElement>): void {
    e.preventDefault()
    e.stopPropagation()
    if ((e.target as HTMLElement).id === 'ruleEditor-w-Rules' && draggableItem) {
      setEditorVales(onDropItemToCanvas(editorRulesValues, draggableItem))
      setDraggableItem(null)
    }
  }

  function dragOver(e: React.DragEvent<HTMLElement>): void {
    e.preventDefault()
    e.stopPropagation()
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
