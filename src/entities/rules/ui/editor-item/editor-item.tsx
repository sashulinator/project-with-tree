import './editor-item.css'
import { EditorInput } from '../editor-input/editor-input'
import { EditorButtons } from '../editor-buttons/editor-buttons'
import { editorRulesItemType, editorRulesValuesAtom } from '../../state/state'
import { useSetRecoilState } from 'recoil'
import { getCheckedArr } from '../../lib'
interface Props {
  values: editorRulesItemType[]
  id: string
  checked: boolean
}

export function EditorItem(props: Props): JSX.Element {
  const { values, id, checked } = props
  const setEditorRulesVales = useSetRecoilState(editorRulesValuesAtom)

  return (
    <div className='e-Rules-ui-EdItem'>
      <input
        type='checkbox'
        style={{ marginRight: '20px', cursor: 'pointer' }} // надо делать кастомный чекбокс
        checked={checked}
        onChange={handleCheck}
      />
      <ul className='list'>
        {values.map((item, i) => (
          <li key={item.id}>
            <EditorInput id={item.id} value={item.value} />
            {i !== values.length - 1 && <EditorButtons id={item.id} />}
          </li>
        ))}
      </ul>
    </div>
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
