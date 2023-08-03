import './editor-item.css'
import { EditorInput } from '../editor-input/editor-input'
import { EditorButtons } from '../editor-buttons/editor-buttons'
import { editorRulesItemType, editorRulesValuesAtom } from '../../state/state'
import { useSetRecoilState } from 'recoil'
import { getCheckedArr } from '../../lib'
import Checkbox from '~/ui/checkbox/ui/checkbox'
import Flex, { FlexProps } from '~/abstract/flex/ui/flex'
import { c } from '~/utils/core'
interface Props {
  values: editorRulesItemType[]
  id: string
  checked: boolean
  rootProps?: FlexProps
}

EditorItem.displayName = 'e-Rules-ui-EdItem'

export function EditorItem(props: Props): JSX.Element {
  const { values, id, checked, rootProps } = props
  const setEditorRulesVales = useSetRecoilState(editorRulesValuesAtom)

  return (
    <Flex crossAxis='center' gap='xl' className={c(EditorItem.displayName, rootProps?.className)} {...rootProps}>
      <Checkbox checked={checked} onChange={handleCheck} style={{ cursor: 'pointer' }} />
      <ul className='list'>
        {values.map((item, i) => (
          <li key={item.id}>
            <EditorInput id={item.id} value={item.value} />
            {i !== values.length - 1 && <EditorButtons id={item.id} />}
          </li>
        ))}
      </ul>
    </Flex>
  )

  // Private
  function handleCheck(e: React.ChangeEvent<HTMLInputElement>): void {
    let checked = false
    if (e.target.checked) {
      checked = true
    }
    setEditorRulesVales((arr) => getCheckedArr(arr, checked, id))
  }
}
