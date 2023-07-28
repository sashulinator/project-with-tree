import Flex from '~/abstract/flex'
import { PrimaryButton } from '~/ui/button'
import { Radio } from '../radio/radio'
import { editorRulesValuesAtom } from '../../state/state'
import { useRecoilState } from 'recoil'
import uniqid from 'uniqid'
interface ButtonsProps {
  oneElement: boolean
  lastElement: boolean
  id: string
}

export function EditorButtons(props: ButtonsProps): JSX.Element {
  const { oneElement, lastElement, id } = props
  const [editorRulesValues, setEditorRulesValues] = useRecoilState(editorRulesValuesAtom)

  return (
    <Flex gap='xl' style={{ alignItems: 'center' }}>
      {!oneElement && (
        <PrimaryButton round className='add-delete-btn' onClick={deleteCondition}>
          -
        </PrimaryButton>
      )}
      {lastElement && (
        <PrimaryButton round className='add-delete-btn' onClick={addCondition}>
          +
        </PrimaryButton>
      )}

      {!lastElement && <Radio id={id} />}
    </Flex>
  )

  // Private
  function deleteCondition(): void {
    const result = editorRulesValues
      .map((arr) => {
        return { ...arr, valueArr: arr.valueArr.filter((item) => item.id !== id) }
      })
      .filter((arr) => arr.valueArr.length > 0)

    setEditorRulesValues(result)
  }

  function addCondition(): void {
    setEditorRulesValues([...editorRulesValues, { id: uniqid(), valueArr: [{ id: uniqid(), value: '' }] }])
  }
}
