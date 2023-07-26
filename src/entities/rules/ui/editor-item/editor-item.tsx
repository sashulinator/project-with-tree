import { useSetRecoilState } from 'recoil'

import { editorRulesValuesAtom } from '../../state/state'
import { PrimaryButton } from '~/ui/button/variants/primary'
import './editor-item.css'
import Flex from '~/abstract/flex/ui/flex'
import { EditorInput } from '../editor-rules/editor-input'
import { Radio } from '../radio/radio'
interface Props {
  id: number
  value: string
  lastElement: boolean
  oneElement: boolean
}

export function EditorItem(props: Props): JSX.Element {
  const { id, value, lastElement, oneElement } = props
  const setEditorRulesValues = useSetRecoilState(editorRulesValuesAtom)

  return (
    <>
      <EditorInput id={id} value={value} />
      <Flex>
        {!oneElement && (
          <PrimaryButton className='add-delete-btn' onClick={deleteIf}>
            -
          </PrimaryButton>
        )}
        {lastElement && (
          <PrimaryButton className='add-delete-btn' onClick={addIf}>
            +
          </PrimaryButton>
        )}
      </Flex>
      {!lastElement && <Radio id={id} />}
    </>
  )

  // Private
  function deleteIf(): void {
    setEditorRulesValues((arr) => arr.filter((item) => item.id !== id))
  }

  function addIf(): void {
    setEditorRulesValues((arr) => [...arr, { id: arr[arr.length - 1].id + 1, value: '' }])
  }
}
