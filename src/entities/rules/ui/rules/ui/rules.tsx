import './rules.css'

import { useRecoilState } from 'recoil'
import Flex from '~/abstract/flex'
import { H1 } from '~/ui/heading'
import { GhostButton } from '~/ui/button'
import { Merge } from '~/ui/icon/variants/merge'
import { Save } from '~/ui/icon/variants/save'
import SplitBtn from '../widgets/item/widgets/split-btn'
import { Item } from '../widgets/item'
import AddDeleteButtons from '../widgets/item/widgets/add-delete-buttons/ui/add-delete-buttons'
import { ArrowLeft, ArrowRight } from '~/ui/icon'
import { useEffect, useRef } from 'react'
import { editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
import { getMergeArr } from '~/entities/rules/lib/get-merge-arr'
import { emitter } from '~/shared/emitter'
import { themes } from '../themes'
import { c } from '~/utils/core'

Rules.displayName = 'ruleEditor-w-Rules'

emitter.emit('addTheme', themes)

export function Rules(): JSX.Element {
  const [editorRulesValues, setEditorVales] = useRecoilState(editorRulesValuesAtom)
  const versionNum = useRef(0)
  const memoryRulesValues = useRef([editorRulesValues])
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
      memoryRulesValues.current.push(editorRulesValues)
    } else {
      memoryRulesValues.current.shift()
      memoryRulesValues.current.push(editorRulesValues)
    }

    versionNum.current = memoryRulesValues.current.length - 1
  }, [editorRulesValues])

  return (
    <ul className={c(Rules.displayName)}>
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
          <GhostButton height={'l'} padding={'s'} onClick={mergeCondition}>
            <Merge width={'30px'} height={'30px'} />
          </GhostButton>
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
              <Item checked={!!item.checked} id={item.id} values={item.valueArr} />
            </div>
            <AddDeleteButtons id={item.id} />
          </li>
        )
      })}
    </ul>
  )

  // Private
  function mergeCondition(): void {
    setEditorVales((arr) => getMergeArr(arr))
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
