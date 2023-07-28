import { EditorInput } from '../editor-input/editor-input'
import { EditorButtons } from '../editor-buttons/editor-buttons'
import { editorRulesItemType, editorRulesValuesAtom } from '../../state/state'
import { useSetRecoilState } from 'recoil'

interface Props {
  values: editorRulesItemType[]
  oneElement: boolean
  lastElement: boolean
  id: string
  checked: boolean
}

export function EditorItem(props: Props): JSX.Element {
  const { values, oneElement, lastElement, id, checked } = props
  const setEditorRulesVales = useSetRecoilState(editorRulesValuesAtom)

  return (
    <div
      style={{
        display: 'flex',
        borderRadius: '10px',
        backgroundColor: 'var(--bg)',
        marginBottom: '10px',
        padding: '15px',
        width: '100%',
      }}
    >
      <input
        type='checkbox'
        style={{ marginRight: '20px', cursor: 'pointer' }}
        checked={checked}
        onChange={handleCheck}
      />
      <ul style={{ width: '100%' }}>
        {values.map((item) => (
          <li key={item.id}>
            <EditorInput id={item.id} value={item.value} />
            <EditorButtons oneElement={oneElement} lastElement={lastElement} id={item.id} />
          </li>
        ))}
      </ul>
    </div>
  )

  // Private
  function handleCheck(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.checked) {
      setEditorRulesVales((arr) =>
        arr.map((item) => {
          if (item.id === id) {
            return { ...item, checked: true }
          }
          return item
        })
      )
    } else {
      setEditorRulesVales((arr) =>
        arr.map((item) => {
          if (item.id === id) {
            return { ...item, checked: false }
          }
          return item
        })
      )
    }
  }
}
