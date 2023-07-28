import Flex from '~/abstract/flex'
import { GhostButton } from '~/ui/button'
import { Radio } from '../radio/radio'
import { editorRulesValuesAtom } from '../../state/state'
import { useRecoilState } from 'recoil'
import uniqid from 'uniqid'
import { Close, Plus } from '~/ui/icon'
import './editor-buttons.css'
interface ButtonsProps {
  id: string
}

export function EditorButtons(props: ButtonsProps): JSX.Element {
  const { id } = props
  const [editorRulesValues, setEditorRulesValues] = useRecoilState(editorRulesValuesAtom)

  return (
    <Flex gap='xl' style={{ alignItems: 'center' }}>
      <GhostButton className='editor-ghBtn' height={'s'} square onClick={deleteCondition}>
        <Close />
      </GhostButton>
      <GhostButton className='editor-ghBtn' height={'s'} square onClick={addCondition}>
        <Plus />
      </GhostButton>
      <Radio id={id} />
    </Flex>
  )

  // Private
  function deleteCondition(): void {
    const result = editorRulesValues
      .map((arr) => {
        if (arr.valueArr.length !== 1) {
          return { ...arr, valueArr: arr.valueArr.filter((item) => item.id !== id) }
        }
        return { ...arr, valueArr: arr.valueArr.filter(() => arr.id !== id) }
      })
      .filter((arr) => arr.valueArr.length > 0)
    console.log(result)
    setEditorRulesValues(result)
  }

  function addCondition(): void {
    setEditorRulesValues([...editorRulesValues, { id: uniqid(), valueArr: [{ id: uniqid(), value: '' }] }])
  }
}
