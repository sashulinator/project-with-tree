import { useRecoilValue } from 'recoil'
import { editorRulesValuesAtom } from '../../state/state'
import { PrimaryButton } from '~/ui/button'
import './editor-rules.css'
import { EditorItem } from '../editor-item/editor-item'
import Flex from '~/abstract/flex'
import { SplitBtn } from './widget/split-btn/split-btn'
import { MergeBtn } from './widget/merge-btn/merge-btn'
import { EditorButtons } from '../editor-buttons/editor-buttons'

export function EditorRules(): JSX.Element {
  const editorRulesValues = useRecoilValue(editorRulesValuesAtom)

  return (
    <ul>
      {editorRulesValues.map((item, i) => {
        return (
          <li key={item.id}>
            <div className='e-Rules-ui-EdRules'>
              <EditorItem checked={!!item.checked} id={item.id} values={item.valueArr} />
              {item.valueArr.length > 1 && <SplitBtn index={i} />}
            </div>
            <EditorButtons id={item.id} />
          </li>
        )
      })}

      <Flex gap='xl' mainAxis='end'>
        <MergeBtn />
        <PrimaryButton height={'l'}>Сохранить</PrimaryButton>
      </Flex>
    </ul>
  )
}
