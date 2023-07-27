import { useRecoilState, useRecoilValue } from 'recoil'
import { checkedItemsAtom, editorRulesValuesAtom, editorRulesValuesType } from '../../state/state'
import Button, { PrimaryButton } from '~/ui/button'
import './editor-rules.css'

import { EditorInput } from '../editor-input/editor-input'
import { EditorButtons } from '../editor-buttons/editor-buttons'
import { EditorItem } from '../editor-item/editor-item'

export function EditorRules(): JSX.Element {
  const [editorRulesValues, setEditorRulesVales] = useRecoilState(editorRulesValuesAtom)

  return (
    <ul>
      {editorRulesValues.map((item, i) => {
        return (
          <li
            key={item.id}
            style={{
              display: 'flex',
              borderRadius: '10px',
              backgroundColor: 'var(--bg)',
              marginBottom: '10px',
              padding: '15px',
            }}
          >
            <EditorItem
              checked={!!item.checked}
              id={item.id}
              values={item.valueArr}
              oneElement={editorRulesValues.length === 1}
              lastElement={i === editorRulesValues.length - 1}
            />
          </li>
        )
      })}
      <Button onClick={mergeIf}>Объеденить</Button>
      <PrimaryButton height={'l'} style={{ marginLeft: 'auto', marginTop: '20px', padding: '10px' }}>
        Сохранить
      </PrimaryButton>
    </ul>
  )
  // Private
  function mergeIf(): void {
    const startArr: editorRulesValuesType[] = []
    const endArr: editorRulesValuesType[] = []
    let flag = false

    editorRulesValues.forEach((item) => {
      if (!item.checked) {
        if (!flag) {
          startArr.push(item)
        } else {
          endArr.push(item)
        }
      } else {
        if (!flag) {
          flag = true
          startArr.push(item)
        } else {
          const test = startArr.pop()
          if (test) {
            startArr.push({ ...test, valueArr: [...test.valueArr, ...item.valueArr] })
          }
        }
      }
    })

    setEditorRulesVales([...startArr, ...endArr])
  }
}
