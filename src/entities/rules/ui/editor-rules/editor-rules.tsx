import { useRecoilState } from 'recoil'
import { editorRulesValuesAtom } from '../../state/state'
import { GhostButton } from '~/ui/button'
import './editor-rules.css'
import { EditorItem } from '../editor-item/editor-item'
import Flex from '~/abstract/flex'
import { SplitBtn } from './widget/split-btn/split-btn'
import { EditorButtons } from '../editor-buttons/editor-buttons'
import { H2 } from '~/ui/heading'
import { Save } from '~/ui/icon/variants/save'
import { getMergeArr } from '../../lib'
import { Merge } from '~/ui/icon/variants/merge'

export function EditorRules(): JSX.Element {
  const [editorRulesValues, setEditorRulesVales] = useRecoilState(editorRulesValuesAtom)

  return (
    <ul className='e-Rules-ui-EditorRules'>
      <Flex className='header' gap='xl' mainAxis='space-between' crossAxis='center'>
        <H2 style={{ marginBottom: 0 }}>Заголовок правила(id правила)</H2>
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
              <EditorItem checked={!!item.checked} id={item.id} values={item.valueArr} />
            </div>
            <EditorButtons id={item.id} />
          </li>
        )
      })}
    </ul>
  )

  function mergeCondition(): void {
    setEditorRulesVales((arr) => getMergeArr(arr))
  }
}
