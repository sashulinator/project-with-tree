import Flex from '~/abstract/flex'
import { PrimaryButton } from '~/ui/button'
import { Radio } from '../radio/radio'
import { editorRulesValuesAtom, idEIAtom } from '../../state/state'
import { useRecoilState } from 'recoil'

interface ButtonsProps {
  oneElement: boolean
  lastElement: boolean
  id: number
}

export function EditorButtons(props: ButtonsProps): JSX.Element {
  const { oneElement, lastElement, id } = props
  const [editorRulesValues, setEditorRulesValues] = useRecoilState(editorRulesValuesAtom)
  const [idEI, setIdEI] = useRecoilState(idEIAtom)

  return (
    <Flex gap='xl' style={{ alignItems: 'center' }}>
      {!oneElement && (
        <PrimaryButton round className='add-delete-btn' onClick={deleteIf}>
          -
        </PrimaryButton>
      )}
      {lastElement && (
        <PrimaryButton round className='add-delete-btn' onClick={addIf}>
          +
        </PrimaryButton>
      )}

      {!lastElement && <Radio id={id} />}
    </Flex>
  )

  // Private
  function deleteIf(): void {
    const result = editorRulesValues
      .map((arr) => {
        return { ...arr, valueArr: arr.valueArr.filter((item) => item.id !== id) }
      })
      .filter((arr) => arr.valueArr.length > 0)

    setEditorRulesValues(result)
  }

  function addIf(): void {
    setEditorRulesValues([...editorRulesValues, { id: idEI, valueArr: [{ id: idEI + 1, value: '' }] }])
    setIdEI((id) => id + 2)
  }
}
