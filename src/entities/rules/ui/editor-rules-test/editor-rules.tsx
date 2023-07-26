import { useRecoilValue } from 'recoil'
import { editorRulesValuesAtom } from '../../state/state'
import { PrimaryButton } from '~/ui/button'
import { EditorItem } from '../editor-item/editor-item'

export function EditorRules(): JSX.Element {
  const editorRulesValues = useRecoilValue(editorRulesValuesAtom)

  return (
    <ul>
      {editorRulesValues.map((item, i) => (
        <li key={item.id}>
          <EditorItem
            oneElement={editorRulesValues.length === 1}
            lastElement={i === editorRulesValues.length - 1}
            id={item.id}
            value={item.value}
          />
        </li>
      ))}
      <PrimaryButton height={'l'} style={{ marginLeft: 'auto', marginTop: '20px', padding: '10px' }}>
        Сохранить
      </PrimaryButton>
    </ul>
  )
}
