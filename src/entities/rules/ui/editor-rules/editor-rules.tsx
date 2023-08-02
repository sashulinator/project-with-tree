import { useRecoilValue } from 'recoil'
import { editorRulesValuesAtom } from '../../state/state'
import { PrimaryButton } from '~/ui/button'
import './editor-rules.css'
import { EditorItem } from '../editor-item/editor-item'
import Flex from '~/abstract/flex'
import { SplitBtn } from './widget/split-btn/split-btn'
import { MergeBtn } from './widget/merge-btn/merge-btn'
import { EditorButtons } from '../editor-buttons/editor-buttons'
import { H2 } from '~/ui/heading'

export function EditorRules(): JSX.Element {
  const editorRulesValues = useRecoilValue(editorRulesValuesAtom)

  return (
    <ul className='e-Rules-ui-EditorRules'>
      <Flex className='header' gap='xl' mainAxis='space-between' crossAxis='center'>
        <H2 style={{ marginBottom: 0 }}>Заголовок правила(id правила)</H2>
        <Flex mainAxis='end' gap='xl'>
          <MergeBtn />
          <PrimaryButton height={'m'}>Сохранить</PrimaryButton>
        </Flex>
      </Flex>
      {editorRulesValues.map((item, i) => {
        return (
          <li key={item.id}>
            <div className='item'>
              <EditorItem checked={!!item.checked} id={item.id} values={item.valueArr} />
              {item.valueArr.length > 1 && <SplitBtn index={i} />}
            </div>
            <EditorButtons id={item.id} />
          </li>
        )
      })}
    </ul>
  )
}
