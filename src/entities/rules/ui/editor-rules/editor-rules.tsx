import { useRecoilState } from 'recoil'
import { editorRulesValuesAtom, editorRulesValuesType } from '../../state/state'
import Button, { GhostButton, PrimaryButton } from '~/ui/button'
import './editor-rules.css'
import { EditorItem } from '../editor-item/editor-item'
import Flex from '~/abstract/flex'
import uniqid from 'uniqid'

export function EditorRules(): JSX.Element {
  const [editorRulesValues, setEditorRulesVales] = useRecoilState(editorRulesValuesAtom)

  return (
    <ul>
      {editorRulesValues.map((item, i) => {
        return (
          <li
            key={item.id}
            style={{
              borderRadius: '10px',
              backgroundColor: 'var(--bg)',
              marginBottom: '20px',
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
            {item.valueArr.length > 1 && (
              <Button
                height={'m'}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => splitCondition(e, i)}
                style={{ border: '2px solid var(--borderColor)' }}
              >
                Разъединить
              </Button>
            )}
          </li>
        )
      })}
      <Flex gap='xl' style={{ width: '100%', justifyContent: 'right' }}>
        <GhostButton height={'l'} onClick={mergeCondition} style={{ border: '2px solid var(--borderColor)' }}>
          Объединить
        </GhostButton>
        <PrimaryButton height={'l'}>Сохранить</PrimaryButton>
      </Flex>
    </ul>
  )
  // Private
  function mergeCondition(): void {
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

  function splitCondition(_, index: number): void {
    const result = editorRulesValues.map((item, i) => {
      if (index === i) {
        return item.valueArr.map((item) => {
          return { id: uniqid(), valueArr: [{ id: item.id, value: item.value }] }
        })
      }
      return item
    })

    setEditorRulesVales(result.flat(1))
  }
}
