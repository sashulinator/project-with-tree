import './editor.css'
import { useRecoilState } from 'recoil'
import Flex from '~/abstract/flex'
import { H2 } from '~/ui/heading'
import { GhostButton } from '~/ui/button'
import { Merge } from '~/ui/icon/variants/merge'
import { Save } from '~/ui/icon/variants/save'
import SplitBtn from '../widgets/item/widgets/split-btn'
import { Item } from '../widgets/item'
import AddDeleteButtons from '../widgets/item/widgets/add-delete-buttons/ui/add-delete-buttons'
import { getMergeArr } from '~/entities/rules/lib'
import { editorRulesValuesAtom } from '~/entities/rules/models'

export function Editor(): JSX.Element {
  const [editorRulesValues, setEditorVales] = useRecoilState(editorRulesValuesAtom)

  return (
    <ul className='e-Rules-ui-Editor'>
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
              <Item checked={!!item.checked} id={item.id} values={item.valueArr} />
            </div>
            <AddDeleteButtons id={item.id} />
          </li>
        )
      })}
    </ul>
  )

  function mergeCondition(): void {
    setEditorVales((arr) => getMergeArr(arr))
  }
}
